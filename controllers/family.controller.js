const Family = require('../models/Family.model');
const User = require('../models/User.model');
const createError = require('http-errors');
const HttpStatus = require('http-status-codes');

module.exports.addFamilyMember = async (req, res, next) => {
    const { familyId, familyMemberId } = req.params;

    try {
        const family = await Family.findById(familyId);
        const familyMemberUser = await User.findById(familyMemberId);

        if (!family || !familyMemberUser) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Familia o usuario no encontrado');
        }

        // Verifica si el miembro ya está en la familia
        if (family.members.some(m => m.user.equals(familyMemberId))) {
            return res.status(HttpStatus.StatusCodes.BAD_REQUEST).send('El miembro ya está en la familia');
        }

        // Añade al usuario como miembro de la familia
        family.members.push({ user: familyMemberId, status: 'pending' });
        await family.save();

        res.status(HttpStatus.StatusCodes.CREATED).json(family);

    } catch (error) {
        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

module.exports.acceptFamilyInvitation = async (req, res, next) => {
    const { familyId, userId } = req.params;

    try {
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Familia no encontrada');
        }

        const member = family.members.find(m => m.user.toString() === userId && m.status === 'pending');
        if (!member) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Invitación no encontrada o ya aceptada');
        }

        member.status = 'accepted';
        await family.save();

        // Asociar al usuario con la familia
        const user = await User.findById(userId);
        user.family = familyId;
        await user.save();

        res.status(HttpStatus.StatusCodes.OK).json(family);

    } catch (error) {
        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

module.exports.rejectFamilyInvitation = async (req, res, next) => {
    const { familyId, userId } = req.params;

    try {
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Familia no encontrada');
        }

        const member = family.members.find(m => m.user.toString() === userId && m.status === 'pending');
        if (!member) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Invitación no encontrada');
        }

        member.status = 'rejected';
        await family.save();

        res.status(HttpStatus.StatusCodes.OK).json(family);

    } catch (error) {
        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

module.exports.blockFamilyMember = async (req, res, next) => {
    const { familyId, userId } = req.params;

    try {
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Familia no encontrada');
        }

        const member = family.members.find(m => m.user.toString() === userId);
        if (!member) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Miembro no encontrado');
        }

        member.status = 'blocked';
        await family.save();

        res.status(HttpStatus.StatusCodes.OK).json(family);

    } catch (error) {
        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};

module.exports.deleteFamilyMember = async (req, res, next) => {
    const { familyId, userId } = req.params;

    try {
        // Encuentra la familia
        const family = await Family.findById(familyId);
        if (!family) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Familia no encontrada');
        }

        // Verifica si el miembro existe en la familia
        const memberIndex = family.members.findIndex(m => m.user.toString() === userId);
        if (memberIndex === -1) {
            return res.status(HttpStatus.StatusCodes.NOT_FOUND).send('Miembro no encontrado en la familia');
        }

        // Elimina al miembro de la familia
        family.members.splice(memberIndex, 1);
        await family.save();

        // Elimina la referencia de la familia en el usuario
        const user = await User.findById(userId);
        if (user && user.family && user.family.toString() === familyId) {
            user.family = null;
            await user.save();
        }

        res.status(HttpStatus.StatusCodes.OK).json({ message: 'Miembro eliminado de la familia', family });

    } catch (error) {
        next(createError(HttpStatus.StatusCodes.INTERNAL_SERVER_ERROR, error.message));
    }
};
const User = require('../models/User');

// Check if user is landlord
exports.isLandlord = async (req, res, next) => {
  if (req.user.role !== 'landlord') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only landlords can perform this action.',
    });
  }
  next();
};

// Check if user is agent
exports.isAgent = async (req, res, next) => {
  if (req.user.role !== 'agent') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only agents can perform this action.',
    });
  }
  next();
};

// Check if user is tenant
exports.isTenant = async (req, res, next) => {
  if (req.user.role !== 'tenant') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only tenants can perform this action.',
    });
  }
  next();
};

// Check if user is landlord or agent
exports.isLandlordOrAgent = async (req, res, next) => {
  if (req.user.role !== 'landlord' && req.user.role !== 'agent') {
    return res.status(403).json({
      success: false,
      message: 'Access denied. Only landlords or agents can perform this action.',
    });
  }
  next();
};

// Check ownership of resource
exports.checkOwnership = (model, ownerField = 'user') => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params.id);

      if (!resource) {
        return res.status(404).json({
          success: false,
          message: 'Resource not found',
        });
      }

      // Check if the user owns the resource
      const resourceOwner = resource[ownerField] || resource.landlord || resource.user;
      
      if (resourceOwner.toString() !== req.user.id) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized to perform this action',
        });
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

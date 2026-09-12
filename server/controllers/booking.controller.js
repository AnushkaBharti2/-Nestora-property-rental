const Booking = require('../models/Booking');
const Property = require('../models/Property');
const User = require('../models/User');

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private
exports.getBookings = async (req, res) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    
    let query = {};

    // Filter by user role
    if (req.user.role === 'tenant') {
      query.tenant = req.user.id;
    } else if (req.user.role === 'landlord') {
      query.landlord = req.user.id;
    }

    if (status) {
      query.status = status;
    }

    const bookings = await Booking.find(query)
      .populate('property', 'title price images location')
      .populate('tenant', 'name email phone avatar')
      .populate('landlord', 'name email phone avatar')
      .sort('-createdAt')
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Booking.countDocuments(query);

    res.status(200).json({
      success: true,
      count: bookings.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: parseInt(page),
      data: bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get single booking
// @route   GET /api/bookings/:id
// @access  Private
exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property', 'title price images location features')
      .populate('tenant', 'name email phone avatar')
      .populate('landlord', 'name email phone avatar');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check authorization
    if (
      booking.tenant._id.toString() !== req.user.id &&
      booking.landlord._id.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this booking',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Create booking
// @route   POST /api/bookings
// @access  Private (Tenant)
exports.createBooking = async (req, res) => {
  try {
    const { propertyId, startDate, endDate, message, contactPhone } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found',
      });
    }

    // Check if property is available
    if (property.status !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Property is not available for booking',
      });
    }

    // Check if dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start >= end) {
      return res.status(400).json({
        success: false,
        message: 'End date must be after start date',
      });
    }

    // Check for overlapping bookings
    const overlapping = await Booking.findOne({
      property: propertyId,
      status: { $in: ['pending', 'approved'] },
      $or: [
        { startDate: { $lte: end }, endDate: { $gte: start } },
      ],
    });

    if (overlapping) {
      return res.status(400).json({
        success: false,
        message: 'Property is already booked for these dates',
      });
    }

    // Calculate total price
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalPrice = property.price * days;

    const booking = await Booking.create({
      property: propertyId,
      tenant: req.user.id,
      landlord: property.landlord,
      startDate: start,
      endDate: end,
      message,
      contactPhone,
      totalPrice,
    });

    const populatedBooking = await Booking.findById(booking._id)
      .populate('property', 'title price images location')
      .populate('tenant', 'name email phone avatar')
      .populate('landlord', 'name email phone avatar');

    res.status(201).json({
      success: true,
      data: populatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id/status
// @access  Private (Landlord)
exports.updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    let booking = await Booking.findById(req.params.id)
      .populate('property');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Only landlord can update status
    if (booking.landlord.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this booking',
      });
    }

    booking.status = status;
    
    if (status === 'approved') {
      // Update property status
      await Property.findByIdAndUpdate(booking.property._id, {
        status: 'rented',
      });
    } else if (status === 'cancelled' || status === 'rejected') {
      // Make property available again
      await Property.findByIdAndUpdate(booking.property._id, {
        status: 'available',
      });
    }

    await booking.save();

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Cancel booking
// @route   PUT /api/bookings/:id/cancel
// @access  Private (Tenant)
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found',
      });
    }

    // Check if user is tenant
    if (booking.tenant.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking',
      });
    }

    // Can't cancel completed bookings
    if (booking.status === 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel completed booking',
      });
    }

    booking.status = 'cancelled';
    await booking.save();

    // Make property available again
    await Property.findByIdAndUpdate(booking.property._id, {
      status: 'available',
    });

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get landlord bookings summary
// @route   GET /api/bookings/summary
// @access  Private (Landlord)
exports.getBookingsSummary = async (req, res) => {
  try {
    const summary = await Booking.aggregate([
      { $match: { landlord: req.user.id } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalRevenue: { $sum: '$totalPrice' },
        },
      },
    ]);

    const pendingCount = summary.find((s) => s._id === 'pending')?.count || 0;
    const approvedCount = summary.find((s) => s._id === 'approved')?.count || 0;
    const completedCount = summary.find((s) => s._id === 'completed')?.count || 0;
    const totalRevenue = summary.reduce((acc, s) => acc + s.totalRevenue, 0);

    res.status(200).json({
      success: true,
      data: {
        pending: pendingCount,
        approved: approvedCount,
        completed: completedCount,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

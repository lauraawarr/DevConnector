const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Load Profile Model
const Profile = require('../../models/Profile');
// Load User Model
const User = require('../../models/User');

// Load Input Validation
const validateProfileInput = require('../../validation/profile');

// @route   GET api/profile/test
// @desc    Tests profile route
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Profile works"}));

// @route   GET api/profile
// @desc    Get current user Profile
// @access  Private
router.get('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const  errors = {};
        Profile.findOne({ user: req.user.id })
            .populate('user', ['name', 'avatar'])
            .then(profile => {
                if (!profile) {
                    errors.noprofile = 'No profile for this user';
                    return res.status(404).json(errors);
                }
                return res.json(profile);
            })
            .catch(err => res.status(404).json(err));
    }
);

// @route   GET api/profile/all
// @desc    Get all Profiles
// @access  Public
router.get('/all', (req, res) => {
    const  errors = {};
    Profile.find()
        .populate('user', ['name', 'avatar'])
        .then(profiles => {
            if (!profiles) {
                errors.noprofile = 'No profiles found';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        })
        .catch(err => {
            console.log(err);
            errors.noprofile = 'No profiles found';
            return res.status(404).json(errors)
        })
});

// @route   GET api/profile/handle/:handle
// @desc    Get Profile by handle
// @access  Public
router.get('/handle/:handle', (req, res) => {
    const  errors = {};
    Profile.findOne({ handle: req.params.handle })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile for this handle';
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
});

// @route   GET api/profile/user/:user_id
// @desc    Get Profile by user ID
// @access  Public
router.get('/user/:user_id', (req, res) => {
    const  errors = {};
    Profile.findOne({ user: req.params.user_id })
        .populate('user', ['name', 'avatar'])
        .then(profile => {
            if (!profile) {
                errors.noprofile = 'No profile for this user ID';
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => {
            console.log(err);
            errors.noprofile = 'No profile for this user ID';
            return res.status(404).json(errors)
        })
});

// @route   POST api/profile
// @desc    Create or Edit user Profile
// @access  Private
router.post('/', passport.authenticate('jwt', {session: false}),
    (req, res) => {
        const { errors, isValid } = validateProfileInput(req.body);

        // Check validation
        if (!isValid) {
            return res.status(400).json(errors)
        }

        // Get fields
        const profileFields = {};
        profileFields.user = req.user.id;
        if (req.body.handle) profileFields.handle = req.body.handle;
        if (req.body.company) profileFields.company = req.body.company;
        if (req.body.website) profileFields.website = req.body.website;
        if (req.body.location) profileFields.location = req.body.location;
        if (req.body.bio) profileFields.bio = req.body.bio;
        if (req.body.status) profileFields.status = req.body.status;
        if (req.body.githubusername) profileFields.githubusername = req.body.githubusername;
        // Skills - Split into array
        if (typeof req.body.skills !== 'undefined') {
            profileFields.skills = req.body.skills.split(',').map(skill => skill.trim());
        }
        // Social
        profileFields.social = {};
        if (req.body.youtube) profileFields.social.youtube = req.body.youtube;
        if (req.body.twitter) profileFields.social.twitter = req.body.twitter;
        if (req.body.instagram) profileFields.social.instagram = req.body.instagram;
        if (req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
        if (req.body.facebook) profileFields.social.facebook = req.body.facebook;

        Profile.findOne({user: req.user.id})
            .then(profile => {
                if (profile) {
                    // Update
                    Profile.findOneAndUpdate(
                        { user: req.user.id },
                        { $set: profileFields },
                        { new: true }
                    )
                    .then(profile => res.json(profile))
                } else {
                    // Check if handle exists
                    Profile.findOne({ handle: profileFields.handle })
                        .then(profile => {
                            if (profile) {
                                errors.handle = 'Handle already exists';
                                return res.status(400).json(errors);
                            }
                            // Save Profile
                            return new Profile(profileFields).save().then(profile => res.json(profile))
                        })
                }
            })
    }
);

module.exports = router;
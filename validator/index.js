/*exports.userSignupValidator  = (req,res,next) => {
    req.check('name','name is require ' ).notEmpty();
    req.check('email',' Email must be between 3 to 32 characters')
        .matches(/.+\@.+\..+/)
        .withMessage('email must contain @')
        .isLength({
           min: 4, 
           max: 32
 
        });
    req.check('password','password is required').notEmpty();
    req.check('password')
        .isLength({ min: 6})
        .withMessage('Password must contain at leats 6 characters')
        .matches(/\d/)
        .withMessage(' password must contain a number ');
    const errors = req.validationErrors();
    if(errors) {
            const firstError = errors.map(error => error.msg )[0]
            return res.status(400).json({error: firstError});
    }
    next();


}; */

const { check, validationResult } = require("express-validator");

exports.userSignupValidator  = (req,res,next) => {
    check('name').notEmpty().withMessage('Name is required'),
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('email is require')
        //.normalizeEmail()
        .isLength({ min: 4, max: 32})
        .withMessage('Email must be between 4 to 32 characters'),
    check('password')
        .notEmpty()
        .withMessage(' Password is required')
        .isLength({ min: 6})
        .withMessage('Password must contain at least 6 characters')
        .matches(/\d/)
        .withMessage('Password must contain at least one number'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()[0].msg });
        }
        next();
    }
};


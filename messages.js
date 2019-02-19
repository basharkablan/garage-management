module.exports = {
    success: {
        status: 'success',
        message: ''
    },
    not_logged_in: {
        status: 'not-logged-in',
        message: 'You need to login first'
    },
    already_logged_in: {
        status: 'already-logged-in',
        message: 'You already logged in'
    },
    wrong_cred: {
        status: 'wrong-cred',
        message:'Incorrect username or password'
    },
    missing_field: {
        status: 'missing-field',
        message: 'Fill the missing fields'
    },
    username_not_available: {
        status: 'username-not-available',
        message: 'The username is not available'
    },
    server_internal_error: {
        status: 'server-internal-error',
        message: 'Server internal error'
    },
    wrong_email: {
        status: 'wrong-email',
        message: 'This email is not registered'
    },
    session_timeout: {
        status: 'session-timeout',
        message: 'Your session has timed out'
    },
    passwords_mismatch: {
        status: 'passwords-mismatch',
        message: 'Passwords do not match'
    },
    invalid_input: {
        status: 'invalid-input',
        message: 'Invalid Input'
    }
}
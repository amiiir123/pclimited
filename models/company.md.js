const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
    name: {
        type: String,
        default:""
    },
    phoneNumber: {
        type: String,
        default:""
    },
    description: {
        type: String,
        default:""
    },
    googleAnalyticsId: {
        type: String,
        default:""
    },
    systemEmail: {
        type: String,
        default:""
    },
    metaApiTrack: {
        type: String,
        default:""
    },
    author: {
        type: String,
        default:""

    },
    companyName: {
        type: String,
        default:""

    },
    companyLocation: {
        type: String,
        default:""

    },
    /*
    logoLight: {
        type: String // This can be a file path or URL

    },
    logo: {
        type: String // This can be a file path or URL
    },*/
    social: {
        facebook: {
            type: String,
            default:""

        },
        x: {
            type: String,
            default:""

        },
        instagram: {
            type: String,
            default:""

        },
        linkedin: {
            type: String,
            default:""

        },
        skype: {
            type: String,
            default:""
        },
        github: {
            type: String,
            default:""
        }
    }
}, { timestamps: true });

const Company = mongoose.model('Company', CompanySchema);

module.exports  = {
    Company
}
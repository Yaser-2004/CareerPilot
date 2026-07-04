import { Programme } from "@/app/types/programme";

export const programmes: Programme[] = [
    {
        id: "mba_lpu",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "LPU Online",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 146240,
            perSemester: 40400,
            emiPerMonth: 7087,
            currency: "INR",
        },
        naacGrade: "A++",
        eligibility: {
            minimumQualification: ["Bachelor's Degree"],
            experienceRequired: false,
        },
        specializations: [
            "Data Science",
            "Business Analytics",
            "Operations Management",
            "Information Technology",
        ],
        recommendedGoals: [
            "Career Growth",
            "Higher Salary",
            "Leadership",
            "Career Switch",
            "Upskill",
        ],
        recommendedUserTypes: [
            "Working Professionals",
            "Students",
            "Freshers"
        ],
        careerOutcomes: [
            "Business Analyst",
            "Operations Manager",
            "Product Manager",
            "Project Manager",
        ],
        placementSupport: true,
        programmeUrl:
            "http://lpuonlinemba.com/?utm_source=Google&utm_medium=Search&utm_campaign=LS-LPU-Online-MBA-Machine",
    },
    {
        id: "mba_manipal",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "Online Manipal (MUJ)",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 180000,
            perSemester: 45400,
            emiPerMonth: 7500,
            currency: "INR",
        },
        naacGrade: "A+",
        eligibility: {
            minimumQualification: ["Bachelor's Degree with 50% marks (45% for reserved)"],
            experienceRequired: false,
        },
        specializations: [
            "Analytics and Data Science",
            "BFSI",
            "IT & FinTech",
            "Supply Chain Management",
        ],
        recommendedGoals: [
            "Skill Mastery",
            "Industry Placement",
            "Tech Management",
        ],
        recommendedUserTypes: [
            "Working Professionals",
            "Tech Graduates",
            "Students"
        ],
        careerOutcomes: [
            "Data Analyst",
            "Supply Chain Manager",
            "FinTech Consultant",
            "Risk Manager",
        ],
        placementSupport: true,
        programmeUrl: "https://www.onlinemanipal.com/master-of-business-administration",
    },
    {
        id: "mba_amity",
        programmeName: "Online MBA (Standard)",
        degree: "MBA",
        university: "Amity University Online",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 12000,
            total: 207000,
            perSemester: 56300,
            emiPerMonth: 8906,
            currency: "INR",
        },
        naacGrade: "A+",
        eligibility: {
            minimumQualification: ["Bachelor's Degree with 40% aggregate"],
            experienceRequired: false,
        },
        specializations: [
            "Marketing & Sales",
            "Finance & Accounting",
            "Human Resource Management",
            "Global Finance Market",
        ],
        recommendedGoals: [
            "Global Exposure",
            "Career Growth",
            "Networking",
            "Corporate Ladder",
        ],
        recommendedUserTypes: [
            "Working Professionals",
            "Freshers",
            "Entrepreneurs"
        ],
        careerOutcomes: [
            "Marketing Manager",
            "HR Consultant",
            "Financial Analyst",
            "Sales Director",
        ],
        placementSupport: true,
        programmeUrl: "https://amityonline.com/online-mba-course",
    },
    {
        id: "mba_uttaranchal",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "Uttaranchal University Online",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 94000,
            perSemester: 24500,
            emiPerMonth: 3956,
            currency: "INR",
        },
        naacGrade: "A+",
        eligibility: {
            minimumQualification: ["Bachelor's Degree with 50% marks (45% for reserved)"],
            experienceRequired: false,
        },
        specializations: [
            "Human Resource Management",
            "Marketing Management",
            "Financial Management",
            "Information Technology Management",
        ],
        recommendedGoals: [
            "Affordable Learning",
            "Career Advancement",
            "Management Skills",
        ],
        recommendedUserTypes: [
            "Working Professionals",
            "Freshers",
            "Budget-conscious Students"
        ],
        careerOutcomes: [
            "HR Executive",
            "Marketing Executive",
            "Financial Analyst",
            "Business Consultant",
        ],
        placementSupport: true,
        programmeUrl: "https://www.onlineuu.in/online-mba-course",
    }
];
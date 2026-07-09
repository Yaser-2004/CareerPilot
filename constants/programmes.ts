import { Programme } from "@/app/types/programme";

export const programmes: Programme[] = [
    {
        id: "mba_lpu",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "Lovely Professional University",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 146240,
            perSemester: 40400,
            emiPerMonth: 7087,
            currency: "INR",
            paymentOptions: ["Flexible semester-wise payment"],
            emiAvailable: true,
            hasScholarships: true,
            scholarshipEligibility: "Defence personnel, alumni, or merit-based applicants",
            inclusions: ["LMS access", "Live classes", "Recorded lectures", "Digital study material", "Online examinations", "Placement support"]
        },
        naacGrade: "A++",
        approvals: ["UGC Entitled", "NAAC A++", "AICTE norms followed where applicable"],
        eligibility: {
            minimumQualification: ["Bachelor's degree in any discipline from a recognized university"],
            preferredMarks: "Generally, 50% aggregate marks preferred (relaxation applies for reserved categories)",
            entranceRequired: false,
            experienceRequired: false,
        },
        recommendedUserTypes: [
            "Working Professionals",
            "Entrepreneurs",
            "Business Owners",
            "Government employees",
            "Fresh graduates looking to build management skills"
        ],
        curriculum: {
            durationSemesters: 4,
            coreSubjects: [
                "Principles of Management", "Marketing Management", "Financial Management",
                "Human Resource Management", "Operations Management", "Business Economics",
                "Business Statistics", "Organizational Behaviour", "Strategic Management",
                "Business Ethics", "Entrepreneurship", "Business Analytics",
                "Project Management", "Research Methodology", "Capstone Project"
            ]
        },
        specializations: [
            "Marketing", "Finance", "HRM", "Operations", "Business Analytics",
            "Digital Marketing", "Data Science", "Information Technology",
            "International Business", "Banking & Financial Services",
            "Healthcare Management", "Logistics & Supply Chain Management"
        ],
        recommendedGoals: [
            "Career Growth", "Higher Salary", "Leadership", "Career Switch", "Upskill"
        ],
        careerOutcomes: [
            "Business Analyst", "Operations Manager", "Product Manager", "Project Manager"
        ],
        placementSupport: true,
        placements: {
            services: [
                "Career Counselling & Guidance", "Resume building", "LinkedIn profile optimization",
                "Mock interviews", "Employability assessments", "Virtual placement drives",
                "Job portal access", "Industry webinars", "Soft skills training"
            ],
            typicalRecruiters: [
                "Accenture", "Deloitte", "EY", "Infosys", "TCS", "Wipro",
                "Capgemini", "IBM", "KPMG", "Genpact", "Amazon"
            ]
        },
        requiredDocuments: [
            "Class 10 Marksheet/Certificate", "Class 12 Marksheet/Certificate",
            "Graduation Marksheet(s)", "Degree Certificate or Provisional Certificate",
            "Aadhaar Card or Passport", "PAN Card (if required)",
            "Recent Passport-size Photograph", "Signature",
            "Category Certificate (if applicable)", "Work Experience Certificate (optional)",
            "Migration Certificate (only if requested)"
        ],
        admissionProcess: {
            steps: [
                "Step 1: Fill the online application form.",
                "Step 2: Upload all required academic and identity documents.",
                "Step 3: Document verification by the university.",
                "Step 4: Pay the registration fee and first-semester or full programme fee.",
                "Step 5: Receive admission confirmation.",
                "Step 6: Student LMS credentials are shared.",
                "Step 7: Attend orientation and begin classes."
            ],
            cycles: "Multiple cycles each year (commonly January and July intakes)"
        },
        programmeUrl: "http://lpuonlinemba.com/?utm_source=Google&utm_medium=Search&utm_campaign=LS-LPU-Online-MBA-Machine",
    },
    {
        id: "mba_manipal",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "Manipal University Jaipur",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 180000,
            perSemester: 45400,
            emiPerMonth: 7500,
            currency: "INR",
            paymentOptions: ["Semester-wise payment"],
            emiAvailable: true,
            hasScholarships: true,
            scholarshipEligibility: "Depending on eligibility categories",
            inclusions: ["Digital learning platform", "E-books", "Live sessions", "Career services"]
        },
        naacGrade: "A+",
        approvals: ["UGC Entitled", "NAAC A+", "WES Recognition", "NIRF-ranked institution"],
        eligibility: {
            minimumQualification: ["Bachelor's degree in any discipline from a recognized university"],
            preferredMarks: "Generally, 50% aggregate marks preferred (relaxation applies for reserved categories)",
            entranceRequired: false,
            experienceRequired: false,
        },
        recommendedUserTypes: [
            "Working Professionals",
            "Entrepreneurs",
            "Business Owners",
            "Government employees",
            "Fresh graduates looking to build management skills",
            "Tech Graduates"
        ],
        curriculum: {
            durationSemesters: 4,
            coreSubjects: [
                "Principles of Management", "Marketing Management", "Financial Management",
                "Human Resource Management", "Operations Management", "Business Economics",
                "Business Statistics", "Organizational Behaviour", "Strategic Management",
                "Business Ethics", "Entrepreneurship", "Business Analytics",
                "Project Management", "Research Methodology", "Capstone Project"
            ]
        },
        specializations: [
            "Finance", "Marketing", "HRM", "Analytics & Data Science",
            "Operations", "Information Systems", "International Business"
        ],
        recommendedGoals: [
            "Skill Mastery", "Industry Placement", "Tech Management"
        ],
        careerOutcomes: [
            "Data Analyst", "Supply Chain Manager", "FinTech Consultant", "Risk Manager"
        ],
        placementSupport: true,
        placements: {
            services: [
                "Career Counselling & Guidance", "Resume building", "LinkedIn profile optimization",
                "Mock interviews", "Employability assessments", "Virtual placement drives",
                "Job portal access", "Industry webinars", "Soft skills training"
            ],
            typicalRecruiters: [
                "Accenture", "Deloitte", "EY", "Infosys", "TCS", "Wipro",
                "Capgemini", "IBM", "KPMG", "Genpact", "Amazon"
            ]
        },
        requiredDocuments: [
            "Class 10 Marksheet/Certificate", "Class 12 Marksheet/Certificate",
            "Graduation Marksheet(s)", "Degree Certificate or Provisional Certificate",
            "Aadhaar Card or Passport", "PAN Card (if required)",
            "Recent Passport-size Photograph", "Signature",
            "Category Certificate (if applicable)", "Work Experience Certificate (optional)",
            "Migration Certificate (only if requested)"
        ],
        admissionProcess: {
            steps: [
                "Step 1: Fill the online application form.",
                "Step 2: Upload all required academic and identity documents.",
                "Step 3: Document verification by the university.",
                "Step 4: Pay the registration fee and first-semester or full programme fee.",
                "Step 5: Receive admission confirmation.",
                "Step 6: Student LMS credentials are shared.",
                "Step 7: Attend orientation and begin classes."
            ],
            cycles: "Multiple cycles each year (commonly January and July intakes)"
        },
        programmeUrl: "https://www.onlinemanipal.com/master-of-business-administration",
    },
    {
        id: "mba_amity",
        programmeName: "Online MBA (Standard)",
        degree: "MBA",
        university: "Amity University",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 12000,
            total: 207000,
            perSemester: 56300,
            emiPerMonth: 8906,
            currency: "INR",
            paymentOptions: ["Monthly payment options"],
            emiAvailable: true,
            hasScholarships: true,
            scholarshipEligibility: "Defence personnel, differently-abled learners and selected categories",
            inclusions: ["LMS", "Live & recorded lectures", "Assignments", "Examinations", "Student support", "Placement assistance"]
        },
        naacGrade: "A+",
        approvals: ["UGC Entitled", "NAAC A+", "AICTE recognition (institutional approvals)", "WES Recognition", "QS-ranked university"],
        eligibility: {
            minimumQualification: ["Bachelor's degree in any discipline from a recognized university"],
            preferredMarks: "Generally, 50% aggregate marks preferred (relaxation applies for reserved categories)",
            entranceRequired: false,
            experienceRequired: false,
        },
        recommendedUserTypes: [
            "Working Professionals",
            "Entrepreneurs",
            "Business Owners",
            "Government employees",
            "Fresh graduates looking to build management skills"
        ],
        curriculum: {
            durationSemesters: 4,
            coreSubjects: [
                "Principles of Management", "Marketing Management", "Financial Management",
                "Human Resource Management", "Operations Management", "Business Economics",
                "Business Statistics", "Organizational Behaviour", "Strategic Management",
                "Business Ethics", "Entrepreneurship", "Business Analytics",
                "Project Management", "Research Methodology", "Capstone Project"
            ]
        },
        specializations: [
            "Marketing & Sales", "Finance & Accounting", "HR Analytics",
            "International Finance", "Digital Entrepreneurship", "Data Science",
            "Retail Management", "Petroleum & Natural Gas", "Global Finance"
        ],
        recommendedGoals: [
            "Global Exposure", "Career Growth", "Networking", "Corporate Ladder"
        ],
        careerOutcomes: [
            "Marketing Manager", "HR Consultant", "Financial Analyst", "Sales Director"
        ],
        placementSupport: true,
        placements: {
            services: [
                "Career Counselling & Guidance", "Resume building", "LinkedIn profile optimization",
                "Mock interviews", "Employability assessments", "Virtual placement drives",
                "Job portal access", "Industry webinars", "Soft skills training"
            ],
            typicalRecruiters: [
                "Accenture", "Deloitte", "EY", "Infosys", "TCS", "Wipro",
                "Capgemini", "IBM", "KPMG", "Genpact", "Amazon"
            ]
        },
        requiredDocuments: [
            "Class 10 Marksheet/Certificate", "Class 12 Marksheet/Certificate",
            "Graduation Marksheet(s)", "Degree Certificate or Provisional Certificate",
            "Aadhaar Card or Passport", "PAN Card (if required)",
            "Recent Passport-size Photograph", "Signature",
            "Category Certificate (if applicable)", "Work Experience Certificate (optional)",
            "Migration Certificate (only if requested)"
        ],
        admissionProcess: {
            steps: [
                "Step 1: Fill the online application form.",
                "Step 2: Upload all required academic and identity documents.",
                "Step 3: Document verification by the university.",
                "Step 4: Pay the registration fee and first-semester or full programme fee.",
                "Step 5: Receive admission confirmation.",
                "Step 6: Student LMS credentials are shared.",
                "Step 7: Attend orientation and begin classes."
            ],
            cycles: "Multiple cycles each year (commonly January and July intakes)"
        },
        programmeUrl: "https://amityonline.com/online-mba-course",
    },
    {
        id: "mba_uttaranchal",
        programmeName: "Online MBA",
        degree: "MBA",
        university: "Uttaranchal University (UU)",
        duration: "2 Years",
        mode: "Online",
        fees: {
            admissionFee: 10000,
            total: 94000,
            perSemester: 24500,
            emiPerMonth: 3956,
            currency: "INR",
            paymentOptions: ["Semester-wise payment", "Annual payment options"],
            emiAvailable: false,
            paymentModes: ["UPI", "Cards", "Net banking"],
            inclusions: ["Examination fee (as per university fee structure)"]
        },
        naacGrade: "A+",
        approvals: ["UGC Entitled", "NAAC A+", "AIU Membership", "WES Recognition"],
        eligibility: {
            minimumQualification: ["Bachelor's degree in any discipline from a recognized university"],
            preferredMarks: "Generally, 50% aggregate marks preferred (relaxation applies for reserved categories)",
            entranceRequired: false,
            experienceRequired: false,
        },
        recommendedUserTypes: [
            "Working Professionals",
            "Entrepreneurs",
            "Business Owners",
            "Government employees",
            "Fresh graduates looking to build management skills",
            "Budget-conscious Students"
        ],
        curriculum: {
            durationSemesters: 4,
            coreSubjects: [
                "Principles of Management", "Marketing Management", "Financial Management",
                "Human Resource Management", "Operations Management", "Business Economics",
                "Business Statistics", "Organizational Behaviour", "Strategic Management",
                "Business Ethics", "Entrepreneurship", "Business Analytics",
                "Project Management", "Research Methodology", "Capstone Project"
            ]
        },
        specializations: [
            "Marketing", "Finance", "Human Resource Management", "Business Analytics",
            "Information Technology", "Digital Marketing", "International Business",
            "Logistics & Supply Chain Management"
        ],
        recommendedGoals: [
            "Affordable Learning", "Career Advancement", "Management Skills"
        ],
        careerOutcomes: [
            "HR Executive", "Marketing Executive", "Financial Analyst", "Business Consultant"
        ],
        placementSupport: true,
        placements: {
            services: [
                "Career Counselling & Guidance", "Resume building", "LinkedIn profile optimization",
                "Mock interviews", "Employability assessments", "Virtual placement drives",
                "Job portal access", "Industry webinars", "Soft skills training"
            ],
            typicalRecruiters: [
                "Accenture", "Deloitte", "EY", "Infosys", "TCS", "Wipro",
                "Capgemini", "IBM", "KPMG", "Genpact", "Amazon"
            ]
        },
        requiredDocuments: [
            "Class 10 Marksheet/Certificate", "Class 12 Marksheet/Certificate",
            "Graduation Marksheet(s)", "Degree Certificate or Provisional Certificate",
            "Aadhaar Card or Passport", "PAN Card (if required)",
            "Recent Passport-size Photograph", "Signature",
            "Category Certificate (if applicable)", "Work Experience Certificate (optional)",
            "Migration Certificate (only if requested)"
        ],
        admissionProcess: {
            steps: [
                "Step 1: Fill the online application form.",
                "Step 2: Upload all required academic and identity documents.",
                "Step 3: Document verification by the university.",
                "Step 4: Pay the registration fee and first-semester or full programme fee.",
                "Step 5: Receive admission confirmation.",
                "Step 6: Student LMS credentials are shared.",
                "Step 7: Attend orientation and begin classes."
            ],
            cycles: "Multiple cycles each year (commonly January and July intakes)"
        },
        programmeUrl: "https://www.onlineuu.in/online-mba-course",
    }
];
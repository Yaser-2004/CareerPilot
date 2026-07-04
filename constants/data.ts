export const PROGRAMMES = ["MBA", "MCA", "BCA", "BBA", "M.Tech", "M.Com", "B.Com"];

export const SUGGESTED_PROMPTS = [
    "Compare MBA specializations",
    "Show affordable online universities",
    "Find programmes under ₹2L",
    "Career guidance",
];

export const HERO_CONVERSATION = {
    studentMessage: "I'm a working professional with a B.Tech. Looking for an online MBA under ₹2L that fits weekends.",
    aiResponse: "Got it — engineering background, weekend bandwidth, budget capped at ₹2L. Three programmes line up, but one stands out.",
    recommendation: {
        programme: "MBA — Business Analytics",
        university: "Symbiosis Centre for Online Learning",
        duration: "24 months · Weekend cohort",
        fee: "₹1,80,000",
        emi: "₹7,500/mo",
        matchScore: 94,
        tags: ["UGC Approved", "Live Mentorship", "Capstone"],
    },
    followUp: "Want me to compare this against an MBA in Product Management next?",
};

export const HOW_IT_WORKS = [
    { step: "01", title: "Tell us about yourself", body: "A few honest questions about your background, goals and constraints. No forms, no cold calls." },
    { step: "02", title: "AI understands your goals", body: "Sensei reads between the lines — career stage, budget, mode, eligibility — and maps you to the right tracks." },
    { step: "03", title: "Receive personalized recommendations", body: "A curated shortlist with fees, EMIs, eligibility and honest trade-offs. Compare side by side." },
];

export const FEATURES = [
    { title: "AI Programme Matching", body: "Match against 400+ programmes using career, budget and eligibility signals." },
    { title: "University Comparison", body: "Side-by-side breakdowns of accreditation, faculty, cohort and outcomes." },
    { title: "Fees & EMI Calculator", body: "Total cost of ownership with no-cost EMI plans, scholarships and tax benefits." },
    { title: "Scholarship Discovery", body: "Surface merit, need-based and employer-sponsored aid you actually qualify for." },
    { title: "Career Guidance", body: "Salary bands, role trajectories and skill gaps mapped to your profile." },
    { title: "Eligibility Checker", body: "Real-time eligibility against academic, work-experience and entrance criteria." },
    { title: "Save Shortlist", body: "Pin programmes, compare timelines and revisit your journey on any device." },
    { title: "AI Counsellor 24/7", body: "Ask anything — admissions, deadlines, documents — in plain language, instantly." },
];

export const TESTIMONIALS = [
    { quote: "Sensei cut through six weeks of agent calls in one evening. I enrolled the next morning.", name: "Ananya Rao", role: "Product Manager, Bengaluru" },
    { quote: "The fee breakdown was the first honest one I saw. EMI math just worked.", name: "Rohan Mehta", role: "Software Engineer, Pune" },
    { quote: "It told me which programme not to pick. That's how I knew it wasn't a sales bot.", name: "Priya Iyer", role: "Marketing Lead, Mumbai" },
];

export const CHAT_QUICK_ACTIONS = [
    "Working Professional",
    "Fresh Graduate",
    "Study Abroad",
    "Online Degree",
    "MBA",
    "Career Switch",
];

export const JOURNEY_STEPS = [
    { id: "profile", label: "Profile", sub: "Your context" },
    { id: "recommendations", label: "Recommendations", sub: "Programme matches" },
    // { id: "compare", label: "Compare", sub: "Side by side" },
    { id: "fees", label: "Fees", sub: "Breakdown, EMI" },
    { id: "applications", label: "Applications", sub: "Secure your seat" },
];

export const PROFILE_FIELDS = [
    { label: "Name", value: null },
    { label: "Qualification", value: null },
    { label: "Experience", value: null },
    { label: "Budget", value: null },
    { label: "Preferred Mode", value: null },
    { label: "Location", value: null },
];

export const INITIAL_MESSAGES = [
    {
        id: "1",
        role: "assistant" as const,
        content: "Hey — glad you're here. I'm Sensei, CareerPilot's admissions copilot. To find the right fit, can I ask: are you currently working, or wrapping up your studies?",
    },
];

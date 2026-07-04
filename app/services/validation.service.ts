const DUMMY_NAMES = new Set([
    "test",
    "testing",
    "demo",
    "user",
    "admin",
    "name",
    "fullname",
    "sample",
    "temp",
    "trial",
    "abc",
    "xyz",
    "qwerty",
    "asdf",
    "zxcv",
    "random",
    "none",
    "na",
    "n/a",
]);

const TEMP_EMAIL_DOMAINS = [
    "mailinator.com",
    "10minutemail.com",
    "guerrillamail.com",
    "yopmail.com",
    "tempmail.com",
    "throwawaymail.com",
    "fakeinbox.com",
    "getnada.com",
    "trashmail.com",
    "moakt.com",
];

function hasSequential(text: string) {
    const s = text.toLowerCase();

    const sequences = [
        "abcdefghijklmnopqrstuvwxyz",
        "0123456789",
    ];

    return sequences.some((seq) => {
        for (let i = 0; i <= seq.length - 5; i++) {
            if (s.includes(seq.slice(i, i + 5))) {
                return true;
            }
        }

        return false;
    });
}

function hasRepeatedCharacters(text: string, limit: number): boolean {
    if (limit < 1) return text.length > 0;
    const regex = new RegExp(`(.)\\1{${limit},}`);
    console.log(regex.test(text));

    return regex.test(text);
}

export function validateName(name: string) {
    const value = name.trim();

    if (!value)
        return "Name is required.";

    if (value.length < 2)
        return "Name must be at least 2 characters.";

    if (value.length > 50)
        return "Name cannot exceed 50 characters.";

    if (
        !/^[A-Za-z0-9 ]+$/.test(value)
    ) {
        return "Only letters, numbers and spaces are allowed.";
    }

    if (
        DUMMY_NAMES.has(value.toLowerCase())
    ) {
        return "Please enter your real name.";
    }

    if (hasRepeatedCharacters(value, 4)) {
        return "Invalid name.";
    }

    if (hasSequential(value)) {
        return "Invalid name.";
    }

    return null;
}

export function validateEmail(email: string) {
    const value = email.trim().toLowerCase();

    if (!value)
        return "Email is required.";

    if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            value
        )
    ) {
        return "Invalid email address.";
    }

    if (value.includes("..")) {
        return "Invalid email address.";
    }

    const domain =
        value.split("@")[1];

    if (
        TEMP_EMAIL_DOMAINS.includes(
            domain
        )
    ) {
        return "Temporary email addresses are not allowed.";
    }

    const username =
        value.split("@")[0];

    if (!/[aeiou]/.test(username)) {
        return "Invalid email address.";
    }

    if (/(.)\1{4,}/.test(username)) {
        return "Invalid email address.";
    }

    return null;
}

export function validatePhone(phone: string) {
    const value = phone.replace(
        /\D/g,
        ""
    );

    if (!value)
        return "Phone number is required.";

    if (!/^[6-9]\d{9}$/.test(value)) {
        return "Enter a valid Indian mobile number.";
    }

    if (
        [
            "0000000000",
            "1111111111",
            "9999999999",
            "1234567890",
        ].includes(value)
    ) {
        return "Invalid phone number.";
    }

    if (/(\d)\1{6,}/.test(value)) {
        return "Invalid phone number.";
    }

    if (hasSequential(value)) {
        return "Invalid phone number.";
    }

    return null;
}
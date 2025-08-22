
const parseFirestoreTimestamp = ({ seconds, nanoseconds }) => {
    return new Date(seconds * 1000 + nanoseconds / 1000000);
};

export const formatFirestoreDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = parseFirestoreTimestamp(timestamp);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};

export default function isTimestampLike(obj) {
    return (
        obj &&
        typeof obj === 'object' &&
        typeof obj.seconds === 'number' &&
        typeof obj.nanoseconds === 'number'
    );
}

export const formatCompleteDate = (d) => {
    if (isTimestampLike(d)) {
        return parseFirestoreTimestamp(d)           // returns a Date()
    }
    return new Date(d)                            // Date from string
}
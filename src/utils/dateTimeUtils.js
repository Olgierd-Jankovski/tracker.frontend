export const formatTimeAgo = (timestamp) => {
    const currentTime = new Date();
    const targetTime = new Date(timestamp);
    const timeDifference = currentTime - targetTime;

    // calculate time difference in days, hours, minutes, seconds
    const seconds = Math.floor(timeDifference / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    // format the time ago string based  on the time difference
    if (days > 0) {
        return `${days} ${days ===1 ? 'day' : 'days'} ago`;
    }
    else if (hours > 0) {
        return `${hours} ${hours ===1 ? 'hour' : 'hours'} ago`;
    }
    else if (minutes > 0) {
        return `${minutes} ${minutes ===1 ? 'minute' : 'minutes'} ago`;
    }
    else {
        return `${seconds} ${seconds ===1 ? 'second' : 'seconds'} ago`;
    }
};
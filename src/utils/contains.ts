function contains(haystack: string, pattern: string, wordBoundary: boolean = true) {
    const updatedPattern = (wordBoundary) ? `\\b${pattern}\\b` : pattern;
    const regex = new RegExp(updatedPattern, 'i');
    return regex.test(haystack.toLowerCase());
}

export default contains;

const Footer = () => {
    const footerStyle = {
        color: 'green',
        fontSize: 16,
        fontStyle: 'italic'
    };
    return (
        <div style={footerStyle}>
            <br />
            <em>Note app, Department of Computer Science, University of Helsinki 2022</em>
        </div>
    );
}

export default Footer;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
const Contact = () => {
    return (
        <div className="footer-icons">
            <a href="https://www.linkedin.com/in/brijesh-singh-a01771217/" target='_blank'>
                <FontAwesomeIcon style={{ width: "30px", height: "30px", marginRight: ".5rem" }} icon={faLinkedin} />
            </a>

            <a href="https://github.com/BRijesh2001singh" target='_blank'>
                <FontAwesomeIcon style={{ width: "30px", height: "30px", marginRight: ".5rem" }} icon={faGithub} />
            </a>
        </div>
    )
}

export default Contact

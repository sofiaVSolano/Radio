import "../styles/footer.css";

export default function Footer() {
    return (
        <>
            <div className="footer">
                <p className="footer-title">Realizado por:</p>
                <ul className="footer-list">
                    <li>
                        <a
                            href="https://www.linkedin.com/in/johan-santacruz-366a641aa/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Johan Camilo Balanta Santacruz
                        </a>{" "}
                        - 30000115778
                    </li>
                    <li>
                        <a
                            href="https://www.linkedin.com/in/kevin-l%C3%B3pez-7a19b8369/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Kevin Aléxis López Camacho
                        </a>{" "}
                        - 30000117437
                    </li>
                    <li>
                        <a
                            href="www.linkedin.com/in/sofia-valencia-66022a345"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Sofía Valencia Solano
                        </a>{" "}
                        - 30000119284
                    </li>
                </ul>
            </div>
        </>
    );
}

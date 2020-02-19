import React from "react";
import bysa_logo from "./bysa.png";

const Footer = () => (
	<footer>
		<div className="cc_logo">
			<a href="http://creativecommons.org/licenses/by-sa/4.0/deed.be">{
				<img src={ bysa_logo }
				alt="Creative Commons CC BY-SA 4.0"/>
				}</a>
		</div>
		<div className="text">
			<p>2019 dataШкола сообщества "<a href='http://opendata.by'>Открытые данные для Беларуси</a>".</p>
		</div>
    </footer>
);

export default Footer;

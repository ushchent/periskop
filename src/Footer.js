import React from "react";
import bysa_logo from "./bysa.png";

const Footer = () => (
	<footer>
		<div class="extra">
		<p>Источники данных: <a href="http://belstat.gov.by">Белстат</a>, <a href="http://nbrb.by">НБРБ</a>, <a href="http://mvd.gov.by">МВД</a>.
            <br/>Репозиторий проекта: <a
            href="https://github.com/ushchent/periskop">github.com/ushchent/periskop.</a>
            <br/>Редактор проекта: Алексей Медвецкий, am@opendata.by.
            <br/>Статус проекта: Прототип.</p>
		</div>
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

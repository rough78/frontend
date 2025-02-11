import { useNavigate } from "react-router-dom";
import styles from "./styles/GeneralErrorPage.module.scss";
import Error from "@shared/assets/images/error.svg";

const GeneralErrorPage = () => {
	return (
		<div>
			<div className={styles.generalErrorPageContainer}>
				<img src={Error} alt="Error" />
				<p className={styles.generalErrorText__main}>서버에 문제가 발생했어요</p>
				<p>잠시후 다시 시도해주세요</p>
				<button
				className={styles.tag}
				onClick={() => window.location.replace("/")}
				type="button"
				>
					홈으로 이동하기
				</button>
			</div>
		</div>
	);
};

export default GeneralErrorPage;
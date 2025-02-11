import { useNavigate } from "react-router-dom";
import styles from "./styles/NotFoundPage.module.scss";
import Error from "@shared/assets/images/error.svg";

const NotFoundPage = () => {
	const navigate = useNavigate();

	return (
		<div>
			<div className={styles.notFoundContainer}>
				<img src={Error} alt="Error" />
				<p className={styles.notFoundText__main}>화면을 불러올 수 없어요</p>
				<p>존재하지 않는 페이지입니다</p>
				<button
				className={styles.tag}
				onClick={() => navigate("/")}
				type="button"
				>
					홈으로 이동하기
				</button>
			</div>
		</div>
	);
};

export default NotFoundPage;
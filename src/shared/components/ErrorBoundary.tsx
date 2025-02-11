import {Component, ReactNode} from "react";
import GeneralErrorPage from "./GeneralErrorPage";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {

    constructor(props: { children: ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
      // 에러 발생시 hasError를 true로 설정
      return { hasError: true };
    }
  
    componentDidCatch(error, info) {
      console.log("오류 상세:");
      console.log(error);
    //   console.log(error.response.data.status);
    //   console.log(error.response.data.message);
    }
  
    render() {
      if (this.state.hasError) {
        console.log("ErrorBoundary 마운트됨");
        // this.setState({ hasError: false });
        return <GeneralErrorPage />;
      }

      return this.props.children;
    }
}

export default ErrorBoundary;

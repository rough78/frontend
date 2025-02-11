import { useApiQuery, useApiMutation } from "@shared/api/hooks/useQuery";
import { useEffect } from "react";



const TestError = () => {
    const { data, error, isLoading } = useApiQuery<any>(
      ["testData"],
    //   "/api/images/draftReview?draftReviewId=1&imageId=1000"
      "/test/http/500"
    );
  
    useEffect(() => {
      if (error) {
        console.error("API 호출 중 오류 발생:", error);
      }
    }, [error]);
  
    if (isLoading) {
      return <div>로딩 중...</div>;
    }
  
    if (error) {
      return <div>오류가 발생했습니다.</div>;
    }
  
    return (
      <div>
        테스트 페이지
      </div>
    );
};
  

export default TestError;
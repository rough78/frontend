import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// 카페 검색 라우터
app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  
  /**
  console.log('검색 요청 받음:', {
    시간: new Date().toISOString(),
    검색어: query,
    헤더: req.headers
  });
  */

  console.log('검색 요청 받음');
  
  try {
    if (!process.env.NAVER_CLIENT_ID || !process.env.NAVER_CLIENT_SECRET) {
      console.error('네이버 API 인증 정보가 없습니다.');
      throw new Error('API 인증 설정이 필요합니다.');
    }

    const response = await axios.get('https://openapi.naver.com/v1/search/local.json', {
      params: {
        query,
        display: 5,
        start: 1,
        sort: 'random'
      },
      headers: {
        'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET
      }
    });

    // console.log('네이버 API 응답:', response.data);
    console.log('네이버 API 응답 성공');

    const cafes = response.data.items.map((item: any) => ({
      name: item.title.replace(/<[^>]*>/g, ''),
      location: {
        latitude: 0,
        longitude: 0
      },
      instaLink: '',
      isBookmark: false,
      avgStar: 0,
      address: item.address,
      profileImg: ''
    }));

    res.json({ data: cafes });
  } catch (error) {
    console.error('검색 처리 중 오류 발생:', error);
    res.status(500).json({ 
      error: 'Failed to fetch cafe data',
      details: error instanceof Error ? error.message : '알 수 없는 오류'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

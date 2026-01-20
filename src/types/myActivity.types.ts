export interface MyActivity {
  id: string;
  type: '예정된 활동' | '활동 중' | '수료';
  status: string;
  title: string;
  date: string;
  address: string;
  thumbnail: string;
}

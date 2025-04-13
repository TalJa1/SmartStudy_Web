export interface LearningData {
  subject: string;
  goal: string;
  progress: string;
  startDate: string;
  endDate: string;
  category: string;
  description: string;
  title: string;
}

export const getLearningData = (): LearningData[] => {
  return [
    {
      subject: "Toán",
      goal: "Đạt 9 điểm",
      progress: "80",
      startDate: "1/1/25",
      endDate: "01/06/2025",
      category: "Chính",
      description: "Cần cải thiện kỹ năng giải bài tập hình học. Đặc biệt chú ý đến các bài toán liên quan đến hình tròn và tam giác.",
      title: "Cải thiện điểm yếu"
    },
    {
      subject: "Văn",
      goal: "Đạt 8 điểm",
      progress: "60",
      startDate: "1/1/25",
      endDate: "1/6/25",
      category: "Phụ",
      description: "Tập trung vào phân tích tác phẩm văn học hiện đại. Đọc thêm các bài phân tích mẫu để nâng cao kỹ năng viết luận.",
      title: "Cải thiện điểm yếu"
    },
    {
      subject: "Anh",
      goal: "Đạt 7.5 IELTS",
      progress: "50",
      startDate: "1/1/25",
      endDate: "1/6/25",
      category: "Chính",
      description: "Luyện tập kỹ năng nghe và nói hàng ngày. Tham gia các câu lạc bộ tiếng Anh để thực hành giao tiếp.",
      title: "Cải thiện điểm yếu"
    },
  ];
};
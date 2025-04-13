import Sidebar from "../../components/Sidebar";

const ScheduleView = () => {
  const ScheduleContent = () => {
    return (
      <div className="schedule-content">
        <h1>Schedule Content</h1>
        {/* Add your schedule content here */}
      </div>
    );
  };

  return (
    <div className="app-container">
      <Sidebar children={<ScheduleContent />} />
    </div>
  );
};

export default ScheduleView;

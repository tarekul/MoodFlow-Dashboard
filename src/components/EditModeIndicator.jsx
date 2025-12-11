const EditModeIndicator = ({ formData }) => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-medium z-50">
      Editing: {formData.log_date}
    </div>
  );
};

export default EditModeIndicator;

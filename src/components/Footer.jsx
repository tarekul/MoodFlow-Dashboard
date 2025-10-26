function Footer({ userData }) {
  return (
    <footer className="bg-white mt-12 py-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
        <p>
          MoodFlow Analytics • Built with{" "}
          <a
            className="text-indigo-600 hover:underline"
            href="https://github.com/tarekul/mood-productivity-analyzer/blob/main/mood_productivity_analysis.ipynb"
          >
            data science
          </a>{" "}
          & ❤️
        </p>
        <p className="text-sm mt-1">
          Analyzing {userData.days_logged} days of data from{" "}
          {userData.date_range.start} to {userData.date_range.end}
        </p>
      </div>
    </footer>
  );
}

export default Footer;

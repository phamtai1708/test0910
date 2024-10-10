const Header = ({ tasks }) => {
  const notCompleteTasks = tasks.filter((item) => !item.complete);
  const taskCount = notCompleteTasks.length;
  return <div className="header">You have {taskCount} tasks left!</div>;
};

export default Header;

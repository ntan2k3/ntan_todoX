const Footer = ({ completedTaskCount = 0, activeTaskCount = 0 }) => {
  return (
    <>
      {completedTaskCount + activeTaskCount > 0 && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            {completedTaskCount > 0 && (
              <>
                Tuyệt vời bạn đã hoàn thành {completedTaskCount} nhiệm vụ!
                {activeTaskCount > 0 &&
                  `, còn ${activeTaskCount} nhiệm vụ nữa!`}
              </>
            )}

            {completedTaskCount === 0 && activeTaskCount > 0 && (
              <>Hãy bắt đầu làm {activeTaskCount} nhiệm vụ nào!</>
            )}
          </p>
        </div>
      )}
    </>
  );
};

export default Footer;

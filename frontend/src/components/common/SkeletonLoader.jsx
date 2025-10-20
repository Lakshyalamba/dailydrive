import './SkeletonLoader.css';

const SkeletonLoader = ({ type = 'course', count = 6 }) => {
  const renderCourseSkeleton = () => (
    <div className="skeleton-course-card">
      <div className="skeleton-thumbnail"></div>
      <div className="skeleton-content">
        <div className="skeleton-meta">
          <div className="skeleton-category"></div>
          <div className="skeleton-rating"></div>
        </div>
        <div className="skeleton-title"></div>
        <div className="skeleton-description"></div>
        <div className="skeleton-instructor">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-name"></div>
        </div>
        <div className="skeleton-footer">
          <div className="skeleton-price"></div>
          <div className="skeleton-button"></div>
        </div>
      </div>
    </div>
  );

  const renderPostSkeleton = () => (
    <div className="skeleton-post-card">
      <div className="skeleton-post-header">
        <div className="skeleton-author">
          <div className="skeleton-avatar"></div>
          <div className="skeleton-author-info">
            <div className="skeleton-name"></div>
            <div className="skeleton-date"></div>
          </div>
        </div>
        <div className="skeleton-category"></div>
      </div>
      <div className="skeleton-post-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text short"></div>
      </div>
      <div className="skeleton-actions">
        <div className="skeleton-action"></div>
        <div className="skeleton-action"></div>
        <div className="skeleton-button"></div>
      </div>
    </div>
  );

  const renderDashboardSkeleton = () => (
    <div className="skeleton-dashboard-card">
      <div className="skeleton-card-header">
        <div className="skeleton-title"></div>
        <div className="skeleton-button"></div>
      </div>
      <div className="skeleton-card-content">
        <div className="skeleton-item">
          <div className="skeleton-text"></div>
          <div className="skeleton-progress"></div>
        </div>
        <div className="skeleton-item">
          <div className="skeleton-text"></div>
          <div className="skeleton-progress"></div>
        </div>
      </div>
    </div>
  );

  const skeletons = Array.from({ length: count }, (_, index) => {
    switch (type) {
      case 'course':
        return <div key={index}>{renderCourseSkeleton()}</div>;
      case 'post':
        return <div key={index}>{renderPostSkeleton()}</div>;
      case 'dashboard':
        return <div key={index}>{renderDashboardSkeleton()}</div>;
      default:
        return <div key={index}>{renderCourseSkeleton()}</div>;
    }
  });

  return (
    <div className={`skeleton-container skeleton-${type}`}>
      {skeletons}
    </div>
  );
};

export default SkeletonLoader;
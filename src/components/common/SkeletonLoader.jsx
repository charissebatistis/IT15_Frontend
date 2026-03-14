import React from 'react';
import './Skeleton.css';

/**
 * Skeleton Loader Components
 * Display placeholder UI while loading data
 * Provides better UX feedback than plain "loading" text
 */

export const StatCardSkeleton = () => (
  <div className="skeleton skeleton-stat-card">
    <div className="skeleton-line skeleton-title"></div>
    <div className="skeleton-line skeleton-value"></div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="skeleton skeleton-chart">
    <div className="skeleton-line skeleton-title"></div>
    <div className="skeleton-bar"></div>
    <div className="skeleton-bar"></div>
    <div className="skeleton-bar"></div>
  </div>
);

export const TableRowSkeleton = ({ columns = 5 }) => (
  <tr className="skeleton-table-row">
    {Array.from({ length: columns }).map((_, i) => (
      <td key={i}>
        <div className="skeleton-line skeleton-table-cell"></div>
      </td>
    ))}
  </tr>
);

const SkeletonLoader = ({ type = 'stat', count = 4 }) => {
  const renderSkeletons = () => {
    switch (type) {
      case 'stat':
        return Array.from({ length: count }).map((_, i) => (
          <StatCardSkeleton key={i} />
        ));
      case 'chart':
        return Array.from({ length: count }).map((_, i) => (
          <ChartSkeleton key={i} />
        ));
      default:
        return null;
    }
  };

  return <div className={`skeleton-grid skeleton-${type}`}>{renderSkeletons()}</div>;
};

export default SkeletonLoader;

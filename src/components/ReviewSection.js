import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addReview } from '../store/slices/reviewsSlice';
import './ReviewSection.css';

const ReviewSection = ({ productId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) =>
    state.reviews.items.filter((review) => review.productId === productId)
  );

  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [author, setAuthor] = useState('');
  const [filterRating, setFilterRating] = useState('all');

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    return (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1);
  }, [reviews]);

  const filteredReviews = useMemo(() => {
    if (filterRating === 'all') return reviews;
    return reviews.filter((r) => r.rating === parseInt(filterRating, 10));
  }, [reviews, filterRating]);

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!author.trim() || !text.trim()) {
      alert('Please fill in all fields');
      return;
    }

    dispatch(
      addReview({
        productId,
        rating,
        text,
        author,
      })
    );

    setRating(5);
    setText('');
    setAuthor('');
  };

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((r) => {
      distribution[r.rating]++;
    });
    return distribution;
  }, [reviews]);

  return (
    <div className="review-section">
      <div className="review-header">
        <h2>Customer Reviews</h2>
        <div className="review-stats">
          <div className="average-rating">
            <span className="rating-number">{averageRating}</span>
            <span className="rating-stars">★</span>
            <span className="review-count">({reviews.length} reviews)</span>
          </div>
        </div>
      </div>

      <div className="review-container">
        <div className="review-form-section">
          <h3>Write a Review</h3>
          <form onSubmit={handleSubmitReview} className="review-form">
            <div className="form-group">
              <label htmlFor="author">Your Name</label>
              <input
                id="author"
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating</label>
              <div className="rating-selector">
                {[5, 4, 3, 2, 1].map((r) => (
                  <label key={r} className="rating-option">
                    <input
                      type="radio"
                      name="rating"
                      value={r}
                      checked={rating === r}
                      onChange={(e) => setRating(parseInt(e.target.value, 10))}
                    />
                    <span className="stars">{'★'.repeat(r)}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="text">Your Review</label>
              <textarea
                id="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Share your experience with this product..."
                rows="4"
              />
            </div>

            <button type="submit" className="btn btn-submit">
              Submit Review
            </button>
          </form>
        </div>

        <div className="review-list-section">
          <div className="rating-distribution">
            <h3>Rating Distribution</h3>
            {[5, 4, 3, 2, 1].map((r) => (
              <div key={r} className="distribution-row">
                <span className="distribution-label">{r} ★</span>
                <div className="distribution-bar">
                  <div
                    className="distribution-fill"
                    style={{
                      width: `${reviews.length > 0 ? (ratingDistribution[r] / reviews.length) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="distribution-count">{ratingDistribution[r]}</span>
              </div>
            ))}
          </div>

          <div className="review-filter">
            <label htmlFor="filter-rating">Filter by Rating:</label>
            <select
              id="filter-rating"
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="reviews-list">
            {filteredReviews.length > 0 ? (
              filteredReviews.map((review) => (
                <div key={review.id} className="review-item">
                  <div className="review-header-item">
                    <span className="review-author">{review.author}</span>
                    <span className="review-rating">{'★'.repeat(review.rating)}</span>
                  </div>
                  <span className="review-date">{review.date}</span>
                  <p className="review-text">{review.text}</p>
                </div>
              ))
            ) : (
              <p className="no-reviews">No reviews with this rating yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewSection;

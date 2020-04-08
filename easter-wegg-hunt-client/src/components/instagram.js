import React, { Component } from 'react';
import './css/instagram.css'

import Egg from './egg';

export default class Instagram extends Component {
  render() {
    return (
      <div>
        <header>
          <div className="container">
            <div className="profile">
              <div className="profile-image">
                <img src="https://images.unsplash.com/photo-1513721032312-6a18a42c8763?w=152&h=152&fit=crop&crop=faces" alt="" />
              </div>
              <div className="profile-user-settings">
                <h1 className="profile-user-name">janedoe_</h1>
                <button className="btn profile-edit-btn">Edit Profile</button>
                <button className="btn profile-settings-btn" aria-label="profile settings"><i className="fas fa-cog" aria-hidden="true" /></button>
              </div>
              <div className="profile-stats">
                <ul>
                  <li><span className="profile-stat-count">164</span> posts</li>
                  <li><span className="profile-stat-count">188</span> followers</li>
                  <li><span className="profile-stat-count">206</span> following</li>
                </ul>
              </div>
              <div className="profile-bio">
                <p><span className="profile-real-name">Jane Doe</span> Lorem ipsum dolor sit, amet consectetur adipisicing elit *emojis*<Egg name='1' /></p>
              </div>
            </div>
          </div>
        </header>
        <main>
          <div className="container">
            <div className="gallery">
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 56</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 2</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1497445462247-4330a224fdb1?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 89</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 5</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 42</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 1</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1502630859934-b3b41d18206c?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Video</span><i className="fas fa-video" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 38</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 0</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1498471731312-b6d2b8280c61?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 47</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 1</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 94</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 3</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1504214208698-ea1916a2195a?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 52</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 4</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1515814472071-4d632dbc5d4a?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 66</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 2</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1511407397940-d57f68e81203?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Gallery</span><i className="fas fa-clone" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 45</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 0</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 34</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 1</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1505058707965-09a4469a87e4?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 41</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 0</li>
                  </ul>
                </div>
              </div>
              <div className="gallery-item" tabIndex={0}>
                <img src="https://images.unsplash.com/photo-1423012373122-fff0a5d28cc9?w=500&h=500&fit=crop" className="gallery-image" alt="" />
                <div className="gallery-item-type">
                  <span className="visually-hidden">Video</span><i className="fas fa-video" aria-hidden="true" />
                </div>
                <div className="gallery-item-info">
                  <ul>
                    <li className="gallery-item-likes"><span className="visually-hidden">Likes:</span><i className="fas fa-heart" aria-hidden="true" /> 30</li>
                    <li className="gallery-item-comments"><span className="visually-hidden">Comments:</span><i className="fas fa-comment" aria-hidden="true" /> 2</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="loader" />
          </div>
        </main>
      </div>
    );
  }
}

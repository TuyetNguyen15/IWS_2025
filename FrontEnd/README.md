This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify





<div className="container py-5">
        <h2 className="text-center text-uppercase text-secondary mb-4">Our Choice</h2>
        <h3 className="text-center text-primary mb-5">The best room just for you!</h3>





        {/* Layout bootstrap grid */}
        <div className="row g-3">
          {/* Bên trái: 4 ảnh nhỏ */}
          <div className="col-md-8">
            <div className="row g-3">
              {rooms.slice(0, 4).map((room) => (
                <div key={room.id} className="col-6">
                  <div className="card h-100 nav-item">
                    <div className="position-relative">
                      <img
                        src={`http://localhost:8080/${room.images[1]?.imageUrl}`}
                        alt={`Phòng ${room.roomNumber}`}
                        className="card-img-top"
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      {/* Giá overlay */}
                      <div className="position-absolute top-0 start-0 bg-dark bg-opacity-75 text-white px-2 py-1 small rounded">
                        ${room.roomPrice}/night
                      </div>
                    </div>
                    {/* Tên phòng */}
                    <div className="card-body p-2 text-center">
                      <h6 className="card-title mb-0">{room.roomType}</h6>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bên phải: 1 ảnh to */}
          {rooms[4] && (
            <div className="col-md-4">
              <div className="card h-100 nav-item">
                <div className="position-relative">
                  <img
                    src={`http://localhost:8080/${rooms[2].images[0]?.imageUrl}`}
                    alt={`Phòng ${rooms[4].roomNumber}`}
                    className="card-img-top"
                    style={{ height: '100%', objectFit: 'cover' }}
                  />
                  {/* Giá overlay */}
                  <div className="position-absolute top-0 start-0 bg-dark bg-opacity-75 text-white px-2 py-1 small rounded">
                    ${rooms[4].roomPrice}/night
                  </div>
                </div>
                {/* Tên phòng */}
                <div className="card-body p-2 text-center">
                  <h5 className="card-title mb-0">{rooms[4].roomType}</h5>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
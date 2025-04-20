# Soccer Team Comparison Website

A responsive web application that allows users to compare soccer teams with detailed statistics and visualizations.

## Features

- **Team Search**: Search for soccer teams with auto-suggestions as you type
- **Team Comparison**: Compare two teams with bar graphs showing key statistics
- **Live Matches**: View currently ongoing matches
- **Trending News**: Stay updated with the latest soccer news
- **Responsive Design**: Works on desktop and mobile devices

## Setup Instructions

### 1. API Configuration

This website uses the API-Football service. You need to:

1. Sign up for an API key at [API-Football](https://www.api-football.com/)
2. Open `js/script.js` and replace `YOUR_API_KEY` with your actual API key:

```javascript
const API_KEY = "YOUR_API_KEY"; // Replace with your actual API key
```

3. Uncomment the actual API calls in the JavaScript file (search for comments indicating mock data)

### 2. Deployment

#### Local Testing

To test locally, simply open the `index.html` file in your browser.

#### Netlify Deployment

To deploy to Netlify:

1. Create a Netlify account if you don't have one
2. From the Netlify dashboard, click "New site from Git"
3. Connect to your Git repository or upload the files directly
4. Set the build command to blank and publish directory to the root folder
5. Click "Deploy site"

## Project Structure

```
soccer-comparison-website/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
├── index.html
└── README.md
```

## API Usage

The website uses the following API endpoints from API-Football:

- `/teams` - For team search and information
- `/fixtures` - For live matches
- `/teams/statistics` - For team statistics
- `/standings` - For league positions

## Customization

You can customize the website by:

- Modifying the CSS in `styles.css` to change colors and layout
- Adding additional statistics to the comparison in `script.js`
- Extending the live matches or news sections with more data

## License

This project is open source and available for personal and commercial use.

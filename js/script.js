// Global variables to store selected teams
let selectedHomeTeam = null;
let selectedAwayTeam = null;

// Import API configuration
import { API_KEY, API_URL } from './config.js';

const API_HEADERS = {
    "x-apisports-key": API_KEY
};

// DOM elements
const homeTeamInput = document.getElementById('homeTeam');
const awayTeamInput = document.getElementById('awayTeam');
const homeSuggestions = document.getElementById('homeSuggestions');
const awaySuggestions = document.getElementById('awaySuggestions');
const compareBtn = document.getElementById('compareBtn');
const comparisonResults = document.getElementById('comparisonResults');
const liveMatchesContainer = document.getElementById('liveMatches');
const trendingNewsContainer = document.getElementById('trendingNews');

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Set up event listeners for search inputs
    homeTeamInput.addEventListener('input', () => handleSearch(homeTeamInput, homeSuggestions, 'home'));
    awayTeamInput.addEventListener('input', () => handleSearch(awayTeamInput, awaySuggestions, 'away'));
    
    // Set up compare button event listener
    compareBtn.addEventListener('click', compareTeams);
    
    // Load live matches and trending news
    loadLiveMatches();
    loadTrendingNews();
});

// Handle search input and show suggestions
async function handleSearch(inputElement, suggestionsElement, teamType) {
    const query = inputElement.value.trim();
    
    // Clear suggestions if query is empty
    if (query.length < 3) {
        suggestionsElement.style.display = 'none';
        suggestionsElement.innerHTML = '';
        return;
    }
    
    try {
        // In a real implementation, this would call the API
        // For demonstration, we'll use mock data
        const teams = await searchTeams(query);
        
        // Display suggestions
        displaySuggestions(teams, suggestionsElement, teamType);
    } catch (error) {
        console.error('Error searching teams:', error);
    }
}

// Mock function to search teams (would be replaced with actual API call)
async function searchTeams(query) {
    // In a real implementation, this would be:
    const response = await fetch(`${API_URL}/teams?search=${query}`, { headers: API_HEADERS });
    const data = await response.json();
    return data.response;
    
    // For demonstration, return mock data
    return [
        {
            team: {
                id: 1,
                name: "Manchester United",
                logo: "https://media.api-sports.io/football/teams/33.png"
            },
            league: {
                name: "Premier League",
                country: "England"
            },
            team_category: "Men"
        },
        {
            team: {
                id: 2,
                name: "Manchester City",
                logo: "https://media.api-sports.io/football/teams/50.png"
            },
            league: {
                name: "Premier League",
                country: "England"
            },
            team_category: "Men"
        },
        {
            team: {
                id: 3,
                name: "Manchester United Women",
                logo: "https://media.api-sports.io/football/teams/1667.png"
            },
            league: {
                name: "Women's Super League",
                country: "England"
            },
            team_category: "Women"
        },
        {
            team: {
                id: 4,
                name: "Manchester City U21",
                logo: "https://media.api-sports.io/football/teams/7979.png"
            },
            league: {
                name: "Premier League 2",
                country: "England"
            },
            team_category: "Under 21"
        },
        {
            team: {
                id: 5,
                name: "Manchester United U18",
                logo: "https://media.api-sports.io/football/teams/7980.png"
            },
            league: {
                name: "U18 Premier League",
                country: "England"
            },
            team_category: "Under 18"
        }
    ].filter(item => item.team.name.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
}

// Display team suggestions
function displaySuggestions(teams, suggestionsElement, teamType) {
    // Clear previous suggestions
    suggestionsElement.innerHTML = '';
    
    if (teams.length === 0) {
        suggestionsElement.style.display = 'none';
        return;
    }
    
    // Create suggestion items
    teams.forEach(item => {
        const suggestionItem = document.createElement('div');
        suggestionItem.className = 'suggestion-item';
        
        // Handle both mock and API response structures
        const team = item.team || item;
        const league = item.league || {};
        const category = item.team_category || '';
        
        suggestionItem.innerHTML = `
            <img src="${team.logo}" alt="${team.name} logo">
            <div class="suggestion-info">
                <div class="team-name">${team.name}</div>
                <div class="team-league">${league.name || ''}, ${league.country || ''}</div>
                <div class="team-category">${category}</div>
            </div>
        `;
        
        // Add click event to select team
        suggestionItem.addEventListener('click', () => {
            selectTeam(item, teamType);
            suggestionsElement.style.display = 'none';
        });
        
        suggestionsElement.appendChild(suggestionItem);
    });
    
    // Show suggestions
    suggestionsElement.style.display = 'block';
}

// Handle team selection
function selectTeam(team, teamType) {
    // Handle both mock and API response structures
    const teamObj = team.team || team;
    
    if (teamType === 'home') {
        selectedHomeTeam = team;
        homeTeamInput.value = teamObj.name;
    } else {
        selectedAwayTeam = team;
        awayTeamInput.value = teamObj.name;
    }
}

// Compare teams and display results
async function compareTeams() {
    if (!selectedHomeTeam || !selectedAwayTeam) {
        alert('Please select both home and away teams');
        return;
    }
    
    try {
        // In a real implementation, this would call the API to get team statistics
        // For demonstration, we'll use mock data
        const homeTeamStats = await getTeamStatistics(selectedHomeTeam.team.id);
        const awayTeamStats = await getTeamStatistics(selectedAwayTeam.team.id);
        
        // Display comparison results
        displayComparisonResults(homeTeamStats, awayTeamStats);
    } catch (error) {
        console.error('Error comparing teams:', error);
    }
}

// Mock function to get team statistics (would be replaced with actual API call)
async function getTeamStatistics(teamId) {
    // In a real implementation, this would be:
     const response = await fetch(`${API_URL}/teams/statistics?team=${teamId}&league=39&season=2023`, { headers: API_HEADERS });
    const data = await response.json();
    return data.response;
    
    // For demonstration, return mock data with random values
    return {
        team: {
            id: teamId,
            name: teamId === 1 ? "Manchester United" : "Manchester City",
            logo: teamId === 1 ? "https://media.api-sports.io/football/teams/33.png" : "https://media.api-sports.io/football/teams/50.png"
        },
        league: {
            name: "Premier League",
            position: teamId === 1 ? 5 : 2
        },
        fixtures: {
            played: {
                total: 38
            },
            wins: {
                total: teamId === 1 ? 21 : 28
            },
            draws: {
                total: teamId === 1 ? 7 : 5
            },
            loses: {
                total: teamId === 1 ? 10 : 5
            }
        },
        goals: {
            for: {
                total: teamId === 1 ? 58 : 94
            },
            against: {
                total: teamId === 1 ? 43 : 33
            }
        },
        cards: {
            red: {
                total: teamId === 1 ? 3 : 1
            }
        },
        injuries: {
            total: teamId === 1 ? 8 : 5
        }
    };
}

// Display comparison results
function displayComparisonResults(homeTeamStats, awayTeamStats) {
    // Show comparison results container
    comparisonResults.style.display = 'block';
    
    // Display league positions
    document.getElementById('homeTeamPosition').innerHTML = `
        <img src="${homeTeamStats.team.logo}" alt="${homeTeamStats.team.name} logo" style="width: 50px; height: 50px;">
        <h3>${homeTeamStats.team.name}</h3>
        <p>Position in ${homeTeamStats.league.name}: <strong>${homeTeamStats.league.position}</strong></p>
    `;
    
    document.getElementById('awayTeamPosition').innerHTML = `
        <img src="${awayTeamStats.team.logo}" alt="${awayTeamStats.team.name} logo" style="width: 50px; height: 50px;">
        <h3>${awayTeamStats.team.name}</h3>
        <p>Position in ${awayTeamStats.league.name}: <strong>${awayTeamStats.league.position}</strong></p>
    `;
    
    // Create bar chart for statistics comparison
    const ctx = document.getElementById('statsChart').getContext('2d');
    
    // Destroy existing chart if it exists
    if (window.statsChart && typeof window.statsChart.destroy === 'function') {
        window.statsChart.destroy();
    }
    
    // Create new chart
    // Safely get nested properties with defaults
    const getSafeStat = (stats, path, defaultValue = 0) => {
        return path.split('.').reduce((acc, key) => 
            (acc && acc[key] !== undefined) ? acc[key] : defaultValue, stats);
    };

    window.statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Wins', 'Losses', 'Draws', 'Goals For', 'Goals Against', 'Red Cards', 'Injuries'],
            datasets: [
                {
                    label: homeTeamStats.team.name,
                    data: [
                        getSafeStat(homeTeamStats, 'fixtures.wins.total'),
                        getSafeStat(homeTeamStats, 'fixtures.loses.total'),
                        getSafeStat(homeTeamStats, 'fixtures.draws.total'),
                        getSafeStat(homeTeamStats, 'goals.for.total'),
                        getSafeStat(homeTeamStats, 'goals.against.total'),
                        getSafeStat(homeTeamStats, 'cards.red.total'),
                        getSafeStat(homeTeamStats, 'injuries.total')
                    ],
                    backgroundColor: 'rgba(54, 162, 235, 0.7)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                },
                {
                    label: awayTeamStats.team.name,
                    data: [
                        getSafeStat(awayTeamStats, 'fixtures.wins.total'),
                        getSafeStat(awayTeamStats, 'fixtures.loses.total'),
                        getSafeStat(awayTeamStats, 'fixtures.draws.total'),
                        getSafeStat(awayTeamStats, 'goals.for.total'),
                        getSafeStat(awayTeamStats, 'goals.against.total'),
                        getSafeStat(awayTeamStats, 'cards.red.total'),
                        getSafeStat(awayTeamStats, 'injuries.total')
                    ],
                    backgroundColor: 'rgba(255, 99, 132, 0.7)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Team Statistics Comparison',
                    font: {
                        size: 16
                    }
                },
                legend: {
                    position: 'top'
                }
            }
        }
    });
}

// Load live matches
async function loadLiveMatches() {
    try {
        // In a real implementation, this would call the API
        // For demonstration, we'll use mock data
        const matches = await getLiveMatches();
        
        // Display live matches
        displayLiveMatches(matches);
    } catch (error) {
        console.error('Error loading live matches:', error);
        liveMatchesContainer.innerHTML = '<div class="error">Failed to load live matches</div>';
    }
}

// Mock function to get live matches (would be replaced with actual API call)
async function getLiveMatches() {
    // In a real implementation, this would be:
     const response = await fetch(`${API_URL}/fixtures?live=all`, { headers: API_HEADERS });
    const data = await response.json();
   return data.response;
    
    // For demonstration, return mock data
    return [
        {
            fixture: {
                id: 1,
                status: { elapsed: 35 }
            },
            teams: {
                home: {
                    name: "Arsenal",
                    logo: "https://media.api-sports.io/football/teams/42.png"
                },
                away: {
                    name: "Chelsea",
                    logo: "https://media.api-sports.io/football/teams/49.png"
                }
            },
            goals: {
                home: 1,
                away: 0
            },
            league: {
                name: "Premier League",
                country: "England"
            }
        },
        {
            fixture: {
                id: 2,
                status: { elapsed: 67 }
            },
            teams: {
                home: {
                    name: "Barcelona",
                    logo: "https://media.api-sports.io/football/teams/529.png"
                },
                away: {
                    name: "Real Madrid",
                    logo: "https://media.api-sports.io/football/teams/541.png"
                }
            },
            goals: {
                home: 2,
                away: 2
            },
            league: {
                name: "La Liga",
                country: "Spain"
            }
        },
        {
            fixture: {
                id: 3,
                status: { elapsed: 12 }
            },
            teams: {
                home: {
                    name: "Bayern Munich",
                    logo: "https://media.api-sports.io/football/teams/157.png"
                },
                away: {
                    name: "Borussia Dortmund",
                    logo: "https://media.api-sports.io/football/teams/165.png"
                }
            },
            goals: {
                home: 0,
                away: 0
            },
            league: {
                name: "Bundesliga",
                country: "Germany"
            }
        }
    ];
}

// Display live matches
function displayLiveMatches(matches) {
    if (matches.length === 0) {
        liveMatchesContainer.innerHTML = '<div class="no-matches">No live matches at the moment</div>';
        return;
    }
    
    // Clear loading message
    liveMatchesContainer.innerHTML = '';
    
    // Create match items
    matches.forEach(match => {
        const matchItem = document.createElement('div');
        matchItem.className = 'match-item';
        
        matchItem.innerHTML = `
            <div class="match-league">${match.league.name}</div>
            <div class="match-teams">
                <img src="${match.teams.home.logo}" alt="${match.teams.home.name} logo">
                <span>${match.teams.home.name}</span>
                <span class="match-score">${match.goals.home} - ${match.goals.away}</span>
                <span>${match.teams.away.name}</span>
                <img src="${match.teams.away.logo}" alt="${match.teams.away.name} logo">
            </div>
            <div class="match-time">${match.fixture.status.elapsed}'</div>
        `;
        
        liveMatchesContainer.appendChild(matchItem);
    });
}

// Load trending news
async function loadTrendingNews() {
    try {
        // In a real implementation, this would call a news API
        // For demonstration, we'll use mock data
        const news = await getTrendingNews();
        
        // Display trending news
        displayTrendingNews(news);
    } catch (error) {
        console.error('Error loading trending news:', error);
        trendingNewsContainer.innerHTML = '<div class="error">Failed to load trending news</div>';
    }
}

// Mock function to get trending news (would be replaced with actual API call)
async function getTrendingNews() {
    // In a real implementation, this would call a news API
    
    // For demonstration, return mock data
    return [
        {
            title: "Ronaldo scores hat-trick in Champions League thriller",
            source: "Sports News",
            date: "2 hours ago"
        },
        {
            title: "Premier League announces new broadcasting deal",
            source: "Football Today",
            date: "5 hours ago"
        },
        {
            title: "National team announces squad for upcoming World Cup qualifiers",
            source: "Soccer Updates",
            date: "Yesterday"
        },
        {
            title: "Top manager signs contract extension with current club",
            source: "Football Insider",
            date: "Yesterday"
        },
        {
            title: "Rising star completes transfer to top European club",
            source: "Transfer News",
            date: "2 days ago"
        }
    ];
}

// Display trending news
function displayTrendingNews(news) {
    if (news.length === 0) {
        trendingNewsContainer.innerHTML = '<div class="no-news">No trending news at the moment</div>';
        return;
    }
    
    // Clear loading message
    trendingNewsContainer.innerHTML = '';
    
    // Create news items
    news.forEach(item => {
        const newsItem = document.createElement('div');
        newsItem.className = 'news-item';
        
        newsItem.innerHTML = `
            <div class="news-title">${item.title}</div>
            <div class="news-source">${item.source}</div>
            <div class="news-date">${item.date}</div>
        `;
        
        trendingNewsContainer.appendChild(newsItem);
    });
}

// Close suggestions when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.search-box')) {
        homeSuggestions.style.display = 'none';
        awaySuggestions.style.display = 'none';
    }
});

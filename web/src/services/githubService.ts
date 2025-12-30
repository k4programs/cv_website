import { SYSTEM_CONFIG } from '../config';

export interface GitHubStats {
  followers: number;
  public_repos: number;
  total_stars: number;
  top_languages: [string, number][]; // [Language, Count]
  last_push: string;
}

export const fetchGitHubStats = async (username: string): Promise<GitHubStats | null> => {
  try {
    // Override username with config if needed, but parameter takes precedence if distinct
    const targetUser = username || SYSTEM_CONFIG.github.username;

    const userResponse = await fetch(`https://api.github.com/users/${targetUser}`);
    if (!userResponse.ok) return null;
    const userData = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${targetUser}/repos?per_page=100&sort=pushed`);
    if (!reposResponse.ok) return null;
    const reposData = await reposResponse.json();

    // Calculate Stars
    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

    // Calculate Languages (Live + Manual Config)
    const langMap: Record<string, number> = {};
    
    // 1. Add Live Data
    reposData.forEach((repo: any) => {
      if (repo.language) {
        langMap[repo.language] = (langMap[repo.language] || 0) + 1;
      }
    });

    // 2. Add Manual Data (from Config)
    SYSTEM_CONFIG.github.manualStack.forEach(([lang, count]) => {
      langMap[lang] = (langMap[lang] || 0) + count;
    });

    // Sort languages by usage
    const sortedLangs = Object.entries(langMap)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5); // Top 5

    // Find latest push
    const lastPush = reposData.length > 0 
      ? new Date(reposData[0].pushed_at).toLocaleDateString() 
      : 'UNKNOWN';

    // Total Repos = Live Public + Configured Private Offset
    const totalRepos = userData.public_repos + SYSTEM_CONFIG.github.privateRepoOffset;

    return {
      followers: userData.followers,
      public_repos: totalRepos, // HYBRID VALUE
      total_stars: totalStars,
      top_languages: sortedLangs,
      last_push: lastPush
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};

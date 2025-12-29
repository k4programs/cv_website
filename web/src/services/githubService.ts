export interface GitHubStats {
  followers: number;
  public_repos: number;
  total_stars: number;
}

export const fetchGitHubStats = async (username: string): Promise<GitHubStats | null> => {
  try {
    const userResponse = await fetch(`https://api.github.com/users/${username}`);
    if (!userResponse.ok) return null;
    const userData = await userResponse.json();

    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`);
    if (!reposResponse.ok) return null;
    const reposData = await reposResponse.json();

    const totalStars = reposData.reduce((acc: number, repo: any) => acc + repo.stargazers_count, 0);

    return {
      followers: userData.followers,
      public_repos: userData.public_repos,
      total_stars: totalStars
    };
  } catch (error) {
    console.error("Error fetching GitHub stats:", error);
    return null;
  }
};

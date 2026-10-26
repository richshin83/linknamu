export type LinkItem = {
  id: string;
  title: string;
  url: string;
};

export type Profile = {
  name: string;
  bio: string;
  /** public/ 기준 경로. 비워 두면 이름 첫 글자로 대체 */
  avatar?: string;
  links: LinkItem[];
};

// TODO: 실제 프로필 정보와 링크로 교체하세요.
export const profile: Profile = {
  name: "신서완",
  bio: "검이불루 화이불치",
  avatar: "/avatar.jpg",
  links: [
    { id: "instagram", title: "Instagram", url: "https://www.instagram.com/rich_sin/" },
    { id: "blog", title: "블로그", url: "https://blog.naver.com/wlrldia" },
    { id: "github", title: "GitHub", url: "https://github.com/richshin83" },
  ],
};

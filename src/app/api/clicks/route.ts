import { getClickCounts, incrementClick } from "@/lib/clicks";
import { isMongoConfigured } from "@/lib/mongodb";
import { profile } from "@/data/profile";

const linkIds = new Set(profile.links.map((link) => link.id));

// 링크 클릭 1회 기록. body: { "linkId": "instagram" }
export async function POST(request: Request) {
  let linkId: unknown;
  try {
    ({ linkId } = await request.json());
  } catch {
    return Response.json({ error: "잘못된 요청 본문입니다." }, { status: 400 });
  }

  // 등록된 링크만 집계해 임의의 값이 DB에 쌓이지 않도록 함
  if (typeof linkId !== "string" || !linkIds.has(linkId)) {
    return Response.json({ error: "알 수 없는 링크입니다." }, { status: 400 });
  }
  if (!isMongoConfigured()) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    await incrementClick(linkId);
    return new Response(null, { status: 204 });
  } catch (err) {
    console.error("클릭 기록 실패:", err);
    return Response.json({ error: "클릭을 기록하지 못했습니다." }, { status: 500 });
  }
}

// 링크별 클릭 수 조회
export async function GET() {
  if (!isMongoConfigured()) {
    return Response.json({ error: "MONGODB_URI가 설정되지 않았습니다." }, { status: 503 });
  }

  try {
    const counts = await getClickCounts();
    const result = Object.fromEntries(profile.links.map((link) => [link.id, counts[link.id] ?? 0]));
    return Response.json(result);
  } catch (err) {
    console.error("클릭 수 조회 실패:", err);
    return Response.json({ error: "클릭 수를 불러오지 못했습니다." }, { status: 500 });
  }
}

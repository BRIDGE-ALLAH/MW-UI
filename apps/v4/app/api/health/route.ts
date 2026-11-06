export function GET() {
  return Response.json({
    status: "ok",
    service: "moonwitness-ui",
    timestamp: new Date().toISOString(),
  })
}

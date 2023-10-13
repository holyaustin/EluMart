import nextJest from "next/jest"

const createJestConfig = nextJest({
  dir: "./",
})

/** @type {import('jest').Config} */
const config = {
  setupFilesAfterEnv: ["@testing-library/jest-dom/extend-expect"],
  testEnvironment: "jest-environment-jsdom",
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  testPathIgnorePatterns: ["<rootDir>/e2e"],
}

export default createJestConfig(config)

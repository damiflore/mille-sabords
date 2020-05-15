import {
  generateLighthouseReport,
  lighthousePullRequestCommentFromTravisBuild,
} from "@dmail/lighthouse-report"
import { projectDirectoryUrl } from "../jsenv.config.js"

lighthousePullRequestCommentFromTravisBuild({
  projectPath: projectDirectoryUrl,
  getLighthouseProductionReport: () =>
    generateLighthouseReport({
      url: "https://mille-sabords.herokuapp.com/",
    }),
})

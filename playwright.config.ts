import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
    projects:[
        {
            name: 'Chromium',
            use:{
                browserName: 'chromium'
            }
        }
    ]
}

export default config
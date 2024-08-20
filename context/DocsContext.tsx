import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

// Define the type for the document structure
export type DocItem = {
  title: string;
  path: string;
  description: string;
};

export type DocArray = DocItem[][][];

// Define the context type
interface DocsContextType {
  docs: DocArray;
  setDocs: React.Dispatch<React.SetStateAction<DocArray>>;
}

// Create the context with an initial value of undefined
const DocsContext = createContext<DocsContextType | undefined>(undefined);

// Define the provider props type
interface DocsProviderProps {
  children: ReactNode;
}

// Create a provider component
export const DocsProvider: React.FC<DocsProviderProps> = ({ children }) => {
  const [docs, setDocs] = useState<DocArray>([
    [
      [
        {
          title: '# Cozy Creators',
          description:
            'Welcome to **Cozy Creators**! Your one stop shop for a generative-AI backend. Lovingly written in Python.',
          path: '/docs/#Cozy-Creators'
        },
        {
          title: '## What is Cozy Creators?',
          description:
            'Cozy Creators is a generative-AI backend that allows you to generate images, text, and more. It is built on top of the***Diffusers architecture, and is designed to be easy to use and integrate into your projects.',
          path: '/docs/#What-is-Cozy-Creators?'
        },
        {
          title: '## Why Cozy Creators?',
          description:
            '- Cozy Creators is designed to be very easy to use and integrate into your projects.***- It is built on top of the Diffusers architecture, which is a powerful and flexible framework for running generative-AI***  models.***- Cozy Creators provides a simple and intuitive API that allows you to quickly and easily generate images, text, and***  more.***- It is also designed to be highly customizable, so you can easily tailor it to your specific needs.',
          path: '/docs/#Why-Cozy-Creators?'
        }
      ],
      []
    ],
    [
      [
        {
          title: '### Summary',
          description:
            '| Project Name                                 | Purpose                                                                | Type                     | Diffusers? | ComfyUI |***| -------------------------------------------- | ---------------------------------------------------------------------- | ------------------------ | ---------- | ------- |***| **Instant Family**                           | Identity-picture to picture                                            | `ID Prompt`              |            |         |***| **Stylus Diffusion**                         | Selects LoRAs from a database                                          | `Meta-System`            |            |         |***| **Align Your Steps**                         | Optimum scheduler; better images and better prompt adherence           | `Scheduler`              |            | ✅      |***| **HiDiffusion**                              | Faster inference, better images at 2048px and 4096px                   | `Model-Modifier`         | ✅         | ✅      |***| **Hyper-SD**                                 | Only 1 - 8 steps in the scheduler; uses TCD                            | `LoRA` `Scheduler`       | ✅         | ✅      |***| **VideoGigaGAN**                             | Upscale videos                                                         | `Model`                  |            |         |***| **PanFusion**                                | 360-degree panoramic image generation                                  | `Model`                  |            |         |***| **TCD (Trajectory Consistent Distillation)** | Turbo Scheduler                                                        | `Scheduler`              | ✅         | ✅      |***| **Stable Diffusion 3**                       | Text-To-Image Model                                                    | `Model`                  |            |         |***| **PhotoMaker**                               | Uses its own model to process images; adds identity to existing models | `Model` `Model-Modifier` |            |         |***| **GigaGAN**                                  | Text to image                                                          | `Model`                  |            |         |',
          path: '/docs/research/#Summary'
        },
        {
          title: '### 📌 Instant Family',
          description:
            '**Description**: Specify faces of people, and generate images with all of their faces present. - **Date**: May 2024***- **Authors**: Chanran Kim, Jeongin Lee, Shichang Joung, Bongmo Kim, Yeul-Min Baek***- **Paper**: [https://arxiv.org/abs/2404.19427](https://arxiv.org/abs/2404.19427)***- **Code**: No weights or code available yet; coming very soon?',
          path: '/docs/research/#📌-Instant-Family'
        },
        {
          title: '### 📌 Story Diffusion',
          description:
            '**Description**: Some attention-technique to generate consistent characters somehow? - **Date**: May 2024***- **Authors**: ByteDance***- **Paper**: [https://arxiv.org/abs/2405.01434](https://arxiv.org/abs/2405.01434)***- **Info**: [https://storydiffusion.github.io/](https://storydiffusion.github.io/)***- **Code**: I’m not sure how this works***  - [https://github.com/HVision-NKU/StoryDiffusion](https://github.com/HVision-NKU/StoryDiffusion)',
          path: '/docs/research/#📌-Story-Diffusion'
        },
        {
          title: '### 📌 Stylus',
          description:
            '**Description**: When the user types a prompt, this meta-expert-system selects from a list of available LoRAs to help it better fulfill the user’s request. It automatically mixes these in. - **Authors**: Carnegie Mellon, UC Berkley, Google Deepmind***- **Info and Paper**: [https://stylus-diffusion.github.io](https://stylus-diffusion.github.io)***- **Code**: Nothing yet***  - [https://github.com/stylus-diffusion/stylus](https://github.com/stylus-diffusion/stylus)',
          path: '/docs/research/#📌-Stylus'
        },
        {
          title: '### 📌 Align Your Steps',
          description:
            "**Description**: Nvidia’s mathematical/theoretical analysis to find the optimal denoising schedule for diffusion models, resulting in better-quality images and prompt adherence. - **Date**: April 2024***- **Authors**: Nvidia***- **Info**: [https://research.nvidia.com/labs/toronto-ai/AlignYourSteps](https://research.nvidia.com/labs/toronto-ai/AlignYourSteps)***- **Library Used**: None***- **Code**: None***- **ComfyUI Implementations**: Built into ComfyUI core as an array of numbers produced by an 'align your steps' node.***  - [https://github.com/comfyanonymous/ComfyUI/blob/10fcd09f4af5de62aa662dab03320cfca46b0edb/comfy_extras/nodes_align_your_steps.py](https://github.com/comfyanonymous/ComfyUI/blob/10fcd09f4af5de62aa662dab03320cfca46b0edb/comfy_extras/nodes_align_your_steps.py)",
          path: '/docs/research/#📌-Align-Your-Steps'
        },
        {
          title: '### 📌 HiDiffusion',
          description:
            '**Description**: Modifies existing Stable Diffusion models to generate higher-resolution images (2048px or 4096px) directly, without duplication artifacts, and provides a speed improvement. - **Date**: April 2024***- **Authors**: MEGVII Technology***- **Info and Paper**: [https://hidiffusion.github.io/](https://hidiffusion.github.io/)***- **Library Used**: Pypi-package for diffusers***- **Code**: Takes a diffuser’s pipeline class and modifies it with one line of code. It works on SDXL, SDXL Turbo, SD2, and SD1.***  - [https://github.com/megvii-research/HiDiffusion](https://github.com/megvii-research/HiDiffusion)***- **ComfyUI Implementations**:***  - [https://github.com/florestefano1975/ComfyUI-HiDiffusion](https://github.com/florestefano1975/ComfyUI-HiDiffusion)***  - [https://github.com/blepping/comfyui_jankhidiffusion](https://github.com/blepping/comfyui_jankhidiffusion)***  - [https://medium.com/diffusion-images/hidiffusion-in-comfyui-higher-resolution-and-faster-generations-with-stable-diffusion-28e93ec91a07](https://medium.com/diffusion-images/hidiffusion-in-comfyui-higher-resolution-and-faster-generations-with-stable-diffusion-28e93ec91a07)',
          path: '/docs/research/#📌-HiDiffusion'
        },
        {
          title: '### 📌 Hyper-SD',
          description:
            '**Description**: Provided as a LoRA add-on for SD1 and SDXL; enables these models to run in 1 - 8 steps, greatly reducing inference time. - **Date**: April 2024***- **Authors**: ByteDance***- **Info and Paper**: [https://hyper-sd.github.io/](https://hyper-sd.github.io/)***- **Model Weights**: [https://huggingface.co/ByteDance/Hyper-SD/tree/main](https://huggingface.co/ByteDance/Hyper-SD/tree/main)***- **Library**: Easily implemented in diffusers; just load the LoRA, fuse them into the pipeline, then use the TCD scheduler.***- **ComfyUI Implementations**: Use the TCD (Trajectory Consistent Distillation) custom-node as a scheduler, and adjust the eta-parameter:***  - [https://github.com/JettHu/ComfyUI-TCD](https://github.com/JettHu/ComfyUI-TCD)',
          path: '/docs/research/#📌-Hyper-SD'
        },

        {
          title: '### 📌 VideoGigaGAN',
          description:
            "**Description**: A video-super-resolution model from Adobe that upscales videos from 128px to 1024px. - **Date**: April 2024***- **Authors**: Adobe***- **Info and Paper**: [https://videogigagan.github.io/](https://videogigagan.github.io/)***- **Code**: Adobe has not released any code. However, it's being recreated by lucidrains:***  - [https://github.com/lucidrains/videogigagan-pytorch](https://github.com/lucidrains/videogigagan-pytorch)",
          path: '/docs/research/#📌-VideoGigaGAN'
        },
        {
          title: '### 📌 PanFusion',
          description:
            '**Description**: 360-degree panoramic image generation, trained on Matterport 3D data. Works well for generating Skyboxes. - **Date**: April 2024***- **Authors**: ???***- **Info and Paper**: [https://chengzhag.github.io/publication/panfusion/](https://chengzhag.github.io/publication/panfusion/)***- **Code**: [https://github.com/chengzhag/PanFusion](https://github.com/chengzhag/PanFusion)***- **Library**: Uses diffusers as a dependency, but is not part of the diffusers library yet. It has its own custom-made python scripts.***- **ComfyUI Implementation**: None that I know of yet***- **Note**: There is also an older paper, Feb 2023, that tries panoramic image generation that was included in the diffusers library. [https://huggingface.co/papers/2302.08113](https://huggingface.co/papers/2302.08113) ### 📌 Trajectory Consistent Distillation (TCD) **Description**: A new scheduler used with turbo-diffusion models. Replaces the LCM (latent consistency model) scheduler. - **Date**: March 2024***- **Authors**: Jianbin Zheng, Southern China University of Technology***- **Paper**: [https://arxiv.org/abs/2402]',
          path: '/docs/research/#📌-PanFusion'
        }
      ],
      []
    ]
  ]);

  const fetchDocs = async () => {
    try {
      const res = await fetch(`/api/doc/searchDocs?query="Test"`, {
        method: 'POST',
        body: JSON.stringify({ query: '' })
      });
      const data = await res.json();
      if (data?.length) {
        setDocs(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocs();
  }, []);

  return <DocsContext.Provider value={{ docs, setDocs }}>{children}</DocsContext.Provider>;
};

// Custom hook to use the DocsContext
export const useDocs = (): DocsContextType => {
  const context = useContext(DocsContext);
  if (!context) {
    throw new Error('useDocs must be used within a DocsProvider');
  }
  return context;
};

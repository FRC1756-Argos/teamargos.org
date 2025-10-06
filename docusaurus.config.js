// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Argos - FIRST Robotics Team 1756',
  favicon: 'img/favicon.png',
  markdown : {
    mermaid: true
  },
  themes: ['@docusaurus/theme-mermaid'],
  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ["en"],
        indexDocs: true,
        indexBlog: false,
        indexPages: true,
        docsRouteBasePath: '/docs',
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
        explicitSearchResultPath: true,
      },
    ],
  ],
  trailingSlash: true,

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://teamargos.org',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FRC1756-Argos', // Usually your GitHub org/user name.
  projectName: 'teamargos.org', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          // editUrl:
          //   'https://github.com/FRC1756-Argos/teamargos.org/blob/main',
        },

        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      colorMode:
      {
        defaultMode: 'dark',
        respectPrefersColorScheme: false
      },
      // Replace with your project's social card
      navbar: {
        title: 'Argos 1756',
        logo: {
          alt: 'argos dog logo',
          src: 'img/favicon.png',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'AboutSidebar',
            position: 'left',
            label: 'About',
          },
          {
            type: 'search',
            position: 'right',
          },
          {
            type: 'docSidebar',
            sidebarId: 'softwareSidebar',
            position: 'left',
            label: 'Software',
          },
          {
            type: 'docSidebar',
            sidebarId: 'MechanicalSidebar',
            position: 'left',
            label: 'Mechanical',
          },
          {
            type: 'docSidebar',
            sidebarId: 'ElectricalSidebar',
            position: 'left',
            label: 'Electrical',
          },
          {
            type: 'docSidebar',
            sidebarId: 'RobotSidebar',
            position: 'left',
            label: 'Robot',
          },
          {
            type: 'docSidebar',
            sidebarId: 'SponsorsSidebar',
            position: 'left',
            label: 'Sponsors',
          },
          {
            to: '/SponsorTheTeam',
            label: 'Sponsor Us',
            position: 'left',
            className: 'special',
          },
          {
            to: '/JoinUs',
            label: 'Join Us',
            position: 'left',
            className: 'special',
          },
          {
            href: 'https://github.com/FRC1756-Argos/teamargos.org',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'About',
            items: [
              {
                label: 'Argos 1756',
                to: '/docs/about_doc/About/',
              },
              {
                label: 'Contact',
                to: '/docs/about_doc/contact/',
              },
              {
                label: 'FIRST',
                to: '/docs/about_doc/First/',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'GitHub',
               href: 'https://github.com/frc1756-argos',
              },
              {
                label: 'The Blue Alliance',
                href: 'https://www.thebluealliance.com/team/1756',
              },
            ],
          },

        ],
        copyright: `Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;

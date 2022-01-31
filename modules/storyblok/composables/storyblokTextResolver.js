export const useStoryblokTextResolver = (data = {}) => {
  const nodes = {
    horizontal_rule(node) {
      return {
        singleTag: "hr",
      };
    },
    blockquote(node) {
      return {
        tag: "blockquote",
      };
    },
    bullet_list(node) {
      return {
        tag: "ul",
      };
    },
    code_block(node) {
      return {
        tag: [
          "pre",
          {
            tag: "code",
            attrs: node.attrs,
          },
        ],
      };
    },
    hard_break(node) {
      return {
        singleTag: "br",
      };
    },
    heading(node) {
      return {
        tag: `h${node.attrs.level}`,
      };
    },
    image(node) {
      return {
        singleTag: [
          {
            tag: "img",
            attrs: pick(node.attrs, ["src", "alt", "title"]),
          },
        ],
      };
    },
    list_item(node) {
      return {
        tag: "li",
      };
    },
    ordered_list(node) {
      return {
        tag: "ol",
      };
    },
    paragraph(node) {
      return {
        tag: "p",
      };
    },
  };

  const marks = {
    bold() {
      return {
        tag: "b",
      };
    },
    strike() {
      return {
        tag: "strike",
      };
    },
    underline() {
      return {
        tag: "u",
      };
    },
    strong() {
      return {
        tag: "strong",
      };
    },
    code() {
      return {
        tag: "code",
      };
    },
    italic() {
      return {
        tag: "i",
      };
    },
    link(node) {
      const attrs = { ...node.attrs };
      const { linktype = "url" } = node.attrs;

      if (isEmailLinkType(linktype)) {
        attrs.href = `mailto:${attrs.href}`;
      }

      if (attrs.anchor) {
        attrs.href = `${attrs.href}#${attrs.anchor}`;
        delete attrs.anchor;
      }

      return {
        tag: [
          {
            tag: "a",
            attrs: attrs,
          },
        ],
      };
    },
    styled(node) {
      return {
        tag: [
          {
            tag: "span",
            attrs: node.attrs,
          },
        ],
      };
    },
  };

  const addNode = (key, schema) => {
    nodes[key] = schema;
  };

  const addMark = (key, schema) => {
    marks[key] = schema;
  };

  const pick = (attrs, allowed) => {
    if (!attrs) {
      return null;
    }
    let h = {};
    for (let key in attrs) {
      let value = attrs[key];
      if (allowed.indexOf(key) > -1 && value !== null) {
        h[key] = value;
      }
    }
    return h;
  };

  const isEmailLinkType = (type) => type === "email";

  const escapeHTML = (string) => {
    const htmlEscapes = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    const reUnescapedHtml = /[&<>"']/g;
    const reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

    return string && reHasUnescapedHtml.test(string)
      ? string.replace(reUnescapedHtml, (chr) => htmlEscapes[chr])
      : string;
  };

  const renderNode = (item) => {
    let html = [];

    if (item.marks) {
      item.marks.forEach((m) => {
        const mark = getMatchingMark(m);

        if (mark) {
          html.push(renderOpeningTag(mark.tag));
        }
      });
    }

    const node = getMatchingNode(item);

    if (node && node.tag) {
      html.push(renderOpeningTag(node.tag));
    }

    if (item.content) {
      item.content.forEach((content) => {
        html.push(renderNode(content));
      });
    } else if (item.text) {
      html.push(escapeHTML(item.text));
    } else if (node && node.singleTag) {
      html.push(renderTag(node.singleTag, " /"));
    } else if (node && node.html) {
      html.push(node.html);
    }

    if (node && node.tag) {
      html.push(renderClosingTag(node.tag));
    }

    if (item.marks) {
      item.marks
        .slice(0)
        .reverse()
        .forEach((m) => {
          const mark = getMatchingMark(m);

          if (mark) {
            html.push(renderClosingTag(mark.tag));
          }
        });
    }

    return html.join("");
  };

  const renderTag = (tags, ending) => {
    if (tags.constructor === String) {
      return `<${tags}${ending}>`;
    }

    const all = tags.map((tag) => {
      if (tag.constructor === String) {
        return `<${tag}${ending}>`;
      } else {
        let h = `<${tag.tag}`;
        if (tag.attrs) {
          for (let key in tag.attrs) {
            let value = tag.attrs[key];
            if (value !== null) {
              h += ` ${key}="${value}"`;
            }
          }
        }

        return `${h}${ending}>`;
      }
    });
    return all.join("");
  };

  const renderOpeningTag = (tags) => {
    return renderTag(tags, "");
  };

  const renderClosingTag = (tags) => {
    if (tags.constructor === String) {
      return `</${tags}>`;
    }

    const all = tags
      .slice(0)
      .reverse()
      .map((tag) => {
        if (tag.constructor === String) {
          return `</${tag}>`;
        } else {
          return `</${tag.tag}>`;
        }
      });

    return all.join("");
  };

  const getMatchingNode = (item) => {
    if (typeof nodes[item.type] !== "function") {
      return;
    }
    return nodes[item.type](item);
  };

  const getMatchingMark = (item) => {
    if (typeof marks[item.type] !== "function") {
      return;
    }
    return marks[item.type](item);
  };

  const text = ref("");

  if (data.content && Array.isArray(data.content)) {
    data.content.forEach((node) => {
      text.value += renderNode(node);
    });
  }

  return {
    text: readonly(text),
  };
};

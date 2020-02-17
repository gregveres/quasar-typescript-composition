import { Ref,computed } from '@vue/composition-api';
import * as CSS from 'csstype';
type CSSStyles = CSS.Properties<string | number>;

interface EssentialLinkViewModel {
  transformedString: Ref<string>;
  transformedUrl: Ref<string>;
  style: Ref<CSSStyles>;
}

export type Type = EssentialLinkViewModel;
export function create(label: string, url: string, useStyle: boolean): EssentialLinkViewModel {
  const transformedString = computed<string>((): string => {
    return label.toUpperCase();
  });
  const transformedUrl = computed<string>((): string => {
    return 'quasar.dev/' + url;
  });
  const style = computed<CSSStyles>((): CSSStyles => {
    const style: CSSStyles = {};
    if (useStyle) {
      style.color = 'pink';
      style.textDecoration = 'strikethrough';
    }
    return style;
  });

  return {
    transformedString,
    transformedUrl,
    style
  }
}
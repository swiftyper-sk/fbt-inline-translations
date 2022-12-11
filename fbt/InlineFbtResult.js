/**
 * Copyright 2015-present Facebook. All Rights Reserved.
 *
 * @format
 * @flow strict-local
 * @emails oncall+internationalization
 */

import FbtResultBase from "fbt/lib/FbtResultBase";
import FbtReactUtil from "fbt/lib/FbtReactUtil";

function em(content, inlineMode, translation, hash) {
  // TODO: in the future, might depend on the translation status of the
  // string to decide on the proper inline mode.
  let className = 'intlInlineMode_normal';
  if (hash != null && hash != '') {
    if (inlineMode === 'TRANSLATION') {
      className = 'intlInlineMode_translatable';
    } else if (inlineMode === 'APPROVE') {
      className = 'intlInlineMode_approvable';
    } else if (inlineMode === 'REPORT') {
      className = 'intlInlineMode_reportable';
    }
  }

  return {
    $$typeof: FbtReactUtil.REACT_ELEMENT_TYPE,
    type: 'em',
    key: null,
    ref: null,
    props: {
      // get the correct hash and trid when the data is available
      className,
      'data-intl-hash': hash,
      'data-intl-translation': translation,
      'data-intl-trid': '',
      children: content,
      // TODO (t22619936): This is because hack's fbt em tags don't match up to
      // the em tags produced here. Disabling hydration warnings prevents
      // spewing a hydration error anywhere server-side rendering is used with
      // fbt and then hydrated.
      suppressHydrationWarning: true,
    },
    _owner: null,
  };
}

const InlineFbtComponent = (props: Props): mixed =>
  em(props.content, props.inlineMode, props.translation, props.hash);

type Props = {
  content: any,
  inlineMode: string,
  translation: string,
  hash: ?string,
};

class InlineFbtResult extends FbtResultBase {
  $$typeof: Symbol = FbtReactUtil.REACT_ELEMENT_TYPE;
  key: ?string = null;
  props: Props;
  ref: ?React$Ref<React$ElementType> = null;
  type: (props: Props) => mixed = InlineFbtComponent;

  constructor(
    contents: any,
    inlineMode: string,
    translation: string,
    hash: ?string,
  ) {
    super(contents);
    // eslint-disable-next-line fb-www/react-state-props-mutation
    this.props = {
      content: contents,
      inlineMode,
      translation,
      hash,
    };
  }
}

export default InlineFbtResult;

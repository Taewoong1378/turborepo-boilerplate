import { SVGProps, useEffect, useState } from 'react';
import { Colors } from 'tailwind-base';
import { iconMapping } from '../../assets/icon/icon-mapping';

export type IconType = keyof typeof iconMapping;

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'fill'> {
  icon: IconType;
  size?: number;
  color?: keyof typeof Colors;
}

export const Icon = ({
  icon: iconComponent,
  size = 24,
  width,
  height,
  color,
  className = '',
  ...props
}: IconProps) => {
  const [SvgIcon, setSvgIcon] = useState<React.ComponentType<React.SVGProps<SVGSVGElement>> | null>(
    null,
  );

  useEffect(() => {
    import(`../../assets/icon/${String(iconComponent)}.svg`)
      .then((iconModule) => {
        setSvgIcon(() => iconModule.default);
      })
      .catch((err) => console.error(`Icon not found: ${String(iconComponent)}.svg`, err));
  }, [iconComponent]);

  return (
    <>
      {SvgIcon && (
        <SvgIcon
          {...props}
          width={width ?? size}
          height={height ?? size}
          {...(color ? { fill: Colors[color], stroke: Colors[color] } : {})}
          className={`inline-block flex-shrink-0 ${className}`}
        />
      )}
    </>
  );
};
